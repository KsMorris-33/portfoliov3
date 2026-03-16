"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    { name: "Github", icon: Github, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full py-12 px-6 border-t border-red-500/10 bg-black/40 backdrop-blur-md overflow-hidden">
            {/* Glow de fondo sutil */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Lado Izquierdo: Branding */}
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <div className="text-2xl font-black tracking-tighter text-white">
                        KSM<span className="text-red-500">2027</span>
                    </div>
                    <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
                        Creative Developer & 3D Artist
                    </p>
                </div>

                {/* Centro: Social Links */}
                <div className="flex items-center gap-6">
                    {socialLinks.map((social) => (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            whileHover={{ y: -5, color: "#ef4444" }}
                            className="text-zinc-400 transition-colors duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <social.icon size={20} />
                            <span className="sr-only">{social.name}</span>
                        </motion.a>
                    ))}
                </div>

                {/* Lado Derecho: Contacto Rápido */}
                <div className="flex flex-col items-center md:items-end">
                    <Link
                        href="mailto:tuemail@ejemplo.com"
                        className="group flex items-center gap-2 text-sm font-bold text-white hover:text-red-500 transition-colors"
                    >
                        TRABAJEMOS JUNTOS
                        <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                    <motion.span
                        animate={{ opacity: [1, 0.5, 1, 0.8, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[10px] text-zinc-600 font-mono mt-2"
                    >
                        © {currentYear} — BORN TO CODE
                    </motion.span>
                </div>
            </div>

            {/* Decoración Neón en las esquinas */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600/5 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-600/5 blur-[100px] rounded-full" />
        </footer>
    );
}