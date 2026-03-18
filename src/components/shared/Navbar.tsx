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
    const [mounted, setMounted] = useState(false); // 1. Nuevo estado para control de hidratación

    useEffect(() => {
        setMounted(true); // 2. Confirmamos que estamos en el cliente

        const handleHashChange = () => {
            if (typeof window !== "undefined") {
                const hash = window.location.hash;
                const index = navItems.findIndex(item => item.href === hash);
                if (index !== -1) setActiveIndex(index);
                else if (hash === "" || hash === "#inicio") setActiveIndex(0);
            }
        };

        window.addEventListener("hashchange", handleHashChange);
        handleHashChange();
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    // 3. Si no ha montado, retornamos null o un placeholder invisible
    // Esto evita que el servidor y el cliente intenten comparar el estado activo
    if (!mounted) return null;

    const breathAnimation = {
        shadow: [
            "0 0 10px rgba(239, 68, 68, 0.2)",
            "0 0 20px rgba(255, 0, 0, 0.5)",
            "0 0 10px rgba(239, 68, 68, 0.2)",
        ],
    };

    return (
        <div className="fixed z-[100] pointer-events-none inset-x-0 bottom-6 flex justify-center md:inset-x-auto md:left-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto">
            <motion.nav
                animate={{ boxShadow: breathAnimation.shadow }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-auto relative flex items-center gap-2 md:gap-6 px-4 py-3 md:px-3 md:py-8 rounded-2xl md:rounded-3xl border border-red-500/30 bg-black/60 backdrop-blur-xl md:flex-col"
            >
                <ul className="flex flex-row md:flex-col items-center gap-4 md:gap-8 relative">
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
                                        "relative z-10 flex items-center justify-center p-3 rounded-xl transition-all duration-300 outline-none",
                                        isActive || isHovered ? "text-red-500" : "text-gray-500"
                                    )}
                                >
                                    <item.icon
                                        size={22}
                                        className={cn(
                                            "transition-transform duration-300",
                                            isActive || isHovered ? "scale-110 drop-shadow-[0_0_8px_#f00]" : ""
                                        )}
                                    />

                                    <span className="hidden md:block absolute left-full ml-6 px-2 py-1 rounded border border-red-900 bg-black text-[10px] font-bold tracking-[0.2em] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase">
                                        {item.name}
                                    </span>
                                </Link>

                                {isActive && (
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute inset-0 bg-red-600/10 border border-red-500/40 rounded-xl -z-10 shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
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