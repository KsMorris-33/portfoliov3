"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, User, Briefcase, Mail } from "lucide-react";
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

    // Track hash changes to update active "route"
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

    // Configuración del brillo rojo que "respira" para todo el Navbar
    const breathAnimation = {
        shadow: [
            "0 0 10px rgba(239, 68, 68, 0.3), inset 0 0 5px rgba(239, 68, 68, 0.2)",
            "0 0 25px rgba(255, 0, 0, 0.7), inset 0 0 15px rgba(255, 0, 0, 0.4)",
            "0 0 10px rgba(239, 68, 68, 0.3), inset 0 0 5px rgba(239, 68, 68, 0.2)",
        ],
    };

    return (
        <div className="fixed bottom-6 sm:bottom-auto sm:top-6 w-full flex justify-center z-50 px-4 pointer-events-none">
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    boxShadow: breathAnimation.shadow
                }}
                transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.5 },
                    boxShadow: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                className="pointer-events-auto relative flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 rounded-full border border-red-500/40 bg-black/70 backdrop-blur-2xl"
            >
                {/* Links de Navegación / Dock */}
                <ul className="flex items-center gap-2 sm:gap-4 relative">
                    {navItems.map((item, index) => {
                        const isActive = activeIndex === index;
                        const isHovered = hoveredIndex === index;

                        return (
                            <li key={item.name} className="relative">
                                <Link
                                    href={item.href}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => setActiveIndex(index)}
                                    className={cn(
                                        "relative z-10 flex items-center justify-center p-3 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300",
                                        isActive || isHovered ? "text-red-400" : "text-white/40 hover:text-red-300/70"
                                    )}
                                >
                                    <item.icon
                                        size={20}
                                        className={cn(
                                            "transition-all duration-300",
                                            isActive || isHovered ? "drop-shadow-[0_0_8px_rgba(255,0,0,1)] scale-110" : ""
                                        )}
                                    />
                                    <span className={cn(
                                        "hidden sm:inline-block ml-2 text-sm font-bold tracking-wide transition-all duration-300",
                                        isActive || isHovered ? "drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]" : ""
                                    )}>
                                        {item.name}
                                    </span>
                                </Link>

                                {/* Background LED Indicator (Active state) */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-red-600/15 border border-red-500/60 rounded-full -z-10 shadow-[0_0_20px_rgba(255,0,0,0.6)]"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                
                                {/* Background LED Indicator (Hover state) */}
                                {isHovered && !isActive && (
                                    <motion.div
                                        layoutId="nav-hover"
                                        className="absolute inset-0 bg-red-600/5 border border-red-500/30 rounded-full -z-10 shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </motion.nav>
        </div>
    );
}