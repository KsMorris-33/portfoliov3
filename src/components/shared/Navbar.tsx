"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Home, User, Briefcase, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Inicio", href: "#", icon: Home },
    { name: "Proyectos", href: "#proyectos", icon: Briefcase },
    { name: "Sobre mí", href: "#sobre-mi", icon: User },
    { name: "Contacto", href: "#contacto", icon: Mail },
];

export default function Navbar() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Aqui trackeamos la ruta activa
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            const index = navItems.findIndex(item => item.href === hash);
            if (index !== -1) {
                setActiveIndex(index);
            } else if (hash === "" || hash === "#inicio") {
                setActiveIndex(0);
            }
        };

        window.addEventListener("hashchange", handleHashChange);
        handleHashChange(); // Run on mount

        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    // Configuración del brillo rojo que "respira"
    const breathAnimation = {
        shadow: [
            "0 0 10px rgba(239, 68, 68, 0.3), inset 0 0 5px rgba(239, 68, 68, 0.2)",
            "0 0 25px rgba(255, 0, 0, 0.7), inset 0 0 15px rgba(255, 0, 0, 0.4)",
            "0 0 10px rgba(239, 68, 68, 0.3), inset 0 0 5px rgba(239, 68, 68, 0.2)",
        ],
    };

    return (
        <>
            {/* Desktop Navbar (Vertical left) */}
            <div className="hidden md:flex fixed left-0 top-0 h-screen z-50 pointer-events-none items-center pl-6">
                <motion.nav
                    initial={{ x: -50, opacity: 0 }}
                    animate={{
                        x: 0,
                        opacity: 1,
                        boxShadow: breathAnimation.shadow
                    }}
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 },
                        boxShadow: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className="pointer-events-auto relative flex flex-col items-center gap-4 px-3 py-6 rounded-3xl border border-red-500/40 bg-black/70 backdrop-blur-2xl"
                >
                    <ul className="flex flex-col items-center gap-6 relative">
                        {navItems.map((item, index) => {
                            const isActive = activeIndex === index;
                            const isHovered = hoveredIndex === index;

                            return (
                                <li key={item.name} className="relative group">
                                    <Link
                                        href={item.href}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={() => setActiveIndex(index)}
                                        className={cn(
                                            "relative z-10 flex items-center justify-center p-3 rounded-xl transition-all duration-300",
                                            isActive || isHovered ? "text-red-400" : "text-white/40 hover:text-red-300/70"
                                        )}
                                    >
                                        <item.icon
                                            size={24}
                                            className={cn(
                                                "transition-all duration-300",
                                                isActive || isHovered ? "drop-shadow-[0_0_8px_rgba(255,0,0,1)] scale-110" : ""
                                            )}
                                        />

                                        {/* Tooltip on hover (Desktop) */}
                                        <span className={cn(
                                            "absolute left-full ml-4 px-3 py-1.5 rounded-md bg-black/90 border border-red-500/30 text-sm font-bold tracking-wide text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap",
                                            "drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]"
                                        )}>
                                            {item.name}
                                        </span>
                                    </Link>

                                    {/* Background LED Indicator (Active state) */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active-desktop"
                                            className="absolute inset-0 bg-red-600/15 border border-red-500/60 rounded-xl -z-10 shadow-[0_0_20px_rgba(255,0,0,0.6)]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}

                                    {/* Background LED Indicator (Hover state) */}
                                    {isHovered && !isActive && (
                                        <motion.div
                                            layoutId="nav-hover-desktop"
                                            className="absolute inset-0 bg-red-600/5 border border-red-500/30 rounded-xl -z-10 shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </motion.nav>
            </div>

            {/* Mobile Navbar Hamburger Toggle */}
            <div className="md:hidden fixed top-4 right-4 z-[60]">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 bg-black/80 border border-red-500/40 rounded-full text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)] backdrop-blur-md outline-none focus:ring-2 focus:ring-red-500 transition-transform active:scale-95"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
                    >
                        <ul className="flex flex-col items-center gap-8 w-full p-8">
                            {navItems.map((item, index) => {
                                const isActive = activeIndex === index;
                                return (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="w-full max-w-xs"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => {
                                                setActiveIndex(index);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={cn(
                                                "flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300",
                                                isActive
                                                    ? "bg-red-600/15 border border-red-500/50 text-red-400 shadow-[0_0_20px_rgba(255,0,0,0.4)]"
                                                    : "text-white/60 hover:bg-white/5 hover:text-red-300"
                                            )}
                                        >
                                            <item.icon size={32} className={isActive ? "drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]" : ""} />
                                            <span className="text-xl font-bold tracking-wider">{item.name}</span>
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}