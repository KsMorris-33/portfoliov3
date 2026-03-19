"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '@/lib/about.data';
import { Terminal, Cpu, GraduationCap, Hexagon, Code2, Database, BrainCircuit, Globe } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
    "FRAMEWORKS": <Globe className="w-5 h-5 text-red-500 group-hover:text-red-400" />,
    "LENGUAJES": <Code2 className="w-5 h-5 text-red-500 group-hover:text-red-400" />,
    "HERRAMIENTAS": <Database className="w-5 h-5 text-red-500 group-hover:text-red-400" />,
    "IA & COPILOTOS": <BrainCircuit className="w-5 h-5 text-red-500 group-hover:text-red-400" />
};

export default function AboutGrid() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <section className="min-h-screen w-full bg-black" />;
    }

    return (
        <section className="relative min-h-fit lg:min-h-screen w-full flex items-center justify-center overflow-hidden 
            pt-20 pb-40       
            md:pt-24 md:pb-24   /* En desktop: padding normal arriba/abajo */
            md:pl-25 md:pr-12   /* En desktop: mucho espacio a la izquierda para el Navbar vertical */
            border-b border-white/5 bg-transparent">



            {/* Luces de fondo (Blooms) */}
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6">

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-20 space-y-6"
                >
                    <div className="flex items-center gap-4">
                        <Terminal className="w-10 h-10 md:w-12 md:h-12 text-red-600 animate-pulse drop-shadow-[0_0_12px_rgba(255,0,0,0.8)]" />
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase">
                            Sobre<span className="text-red-600"> MÍ</span>
                            <span className="animate-ping absolute inline-flex h-2 w-2 md:h-3 md:w-3 rounded-full bg-red-500 opacity-75 ml-2 mt-2"></span>
                        </h2>
                    </div>

                    <div className="p-6 md:p-8 bg-red-950/10 border-l-4 border-red-600 backdrop-blur-sm relative group overflow-hidden max-w-4xl shadow-[0_0_30px_rgba(255,0,0,0.05)]">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out" />
                        <p className="text-base md:text-xl text-red-50/80 leading-relaxed font-light relative z-10">
                            <span className="text-red-500 font-bold mr-3">{'>'}</span>
                            {aboutData.description}
                            <span className="inline-block w-2.5 h-6 bg-red-500 ml-2 animate-pulse align-middle" />
                        </p>
                    </div>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                    {/* Timeline de Educación */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center gap-3 border-b border-red-900/50 pb-4">
                            <GraduationCap className="w-6 h-6 text-red-500" />
                            <h3 className="text-sm font-bold tracking-[0.2em] text-red-500 uppercase">DATOS_ACADÉMICOS</h3>
                        </div>

                        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-2 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-red-600/80 before:to-transparent">
                            {aboutData.education.map((edu, idx) => (
                                <div key={idx} className="relative pl-10 group">
                                    <div className="absolute left-[3px] top-1.5 w-3 h-3 bg-red-600 rounded-sm -translate-x-1/2 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_#f00] z-10"></div>
                                    <div className="p-4 rounded-r-md border-l-2 border-transparent group-hover:border-red-500 bg-red-950/10 transition-all">
                                        <time className="text-[10px] font-bold text-red-500/80 mb-1 block">[{edu.year}]</time>
                                        <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-all">{edu.title}</h4>
                                        <p className="text-xs text-slate-400">{edu.institution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Arsenal Técnico */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center gap-3 border-b border-red-900/50 pb-4">
                            <Cpu className="w-6 h-6 text-red-500" />
                            <h3 className="text-sm font-bold tracking-[0.2em] text-red-500 uppercase">ARSENAL_TÉCNICO</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {aboutData.categories.map((cat, idx) => (
                                <div key={idx} className="group relative bg-black/60 border border-white/5 p-5 backdrop-blur-md hover:border-red-600/60 transition-all rounded-sm overflow-hidden">
                                    {/* Scan Animation */}
                                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <div className="w-full h-[150%] bg-gradient-to-b from-transparent via-red-600/5 to-transparent animate-scan"></div>
                                    </div>

                                    <div className="relative z-10 flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                                        <h4 className="text-red-400 font-bold text-xs tracking-widest flex items-center gap-2">
                                            {categoryIcons[cat.title] || <Hexagon className="w-4 h-4 text-red-500" />}
                                            {cat.title}
                                        </h4>
                                    </div>

                                    <div className="relative z-10 flex flex-wrap gap-1.5">
                                        {cat.items.map((item, i) => (
                                            <span key={i} className="text-[10px] font-mono px-2 py-1 border border-red-900/30 bg-black/80 text-slate-400 group-hover:border-red-500/30 group-hover:text-white transition-all">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}