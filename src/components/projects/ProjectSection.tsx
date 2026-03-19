"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PROJECTS, Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectItem = ({ project, index }: { project: Project; index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isEven = index % 2 === 0;

    useEffect(() => {
        setMounted(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30
    });

    // Transformaciones
    const yImage = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
    const yText = useTransform(smoothProgress, [0, 1], ["5%", "-5%"]);
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            id={project.id}
            ref={containerRef}
            /* Importante: 'relative' soluciona la advertencia de la Imagen 2 */
            className="relative min-h-fit lg:min-h-screen w-full flex items-center justify-center overflow-hidden py-24 lg:py-0 border-b border-white/5 bg-transparent"
        >
            {/* Solo aplicamos los estilos de motion si estamos montados para evitar mismatch */}
            <motion.div
                style={mounted ? { opacity } : { opacity: 0 }}
                className={cn(
                    "container mx-auto px-6 lg:px-20 flex flex-col gap-12 lg:gap-20 items-center relative z-10",
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
            >
                {/* CONTENIDO (TEXTO) */}
                <motion.div
                    style={mounted ? { y: yText } : {}}
                    className="w-full lg:w-1/2 flex flex-col space-y-6 order-2 lg:order-none"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-red-500 font-mono text-xs tracking-[0.3em] px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-sm">
                            {project.year}
                        </span>
                        <div className="h-[1px] w-12 bg-red-900/50" />
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">PROYECTO_{index + 1}</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                        {project.title}
                    </h2>

                    <p className="text-zinc-400 text-base md:text-lg max-w-lg leading-relaxed font-mono">
                        {project.description}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-red-400/70 uppercase tracking-tighter bg-red-950/20 px-2 py-1 rounded-sm border border-red-900/30">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="pt-6 flex flex-wrap gap-4">
                        <a
                            href={project.repoLink || "#"}
                            target={project.repoLink ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="group relative flex items-center gap-3 text-red-500 text-xs font-bold tracking-[0.2em] uppercase border border-red-600/40 bg-red-600/5 hover:bg-red-600 hover:text-white px-8 py-4 transition-all duration-300"
                        >
                            VER_CÓDIGO
                            <span className="absolute top-0 left-0 w-1 h-1 bg-red-600"></span>
                            <span className="absolute bottom-0 right-0 w-1 h-1 bg-red-600"></span>
                        </a>

                        {project.liveLink === "null" || !project.liveLink ? (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="group relative flex items-center gap-3 text-white text-xs font-bold tracking-[0.2em] uppercase border border-red-600 bg-red-600 hover:bg-red-500 hover:border-red-500 px-8 py-4 transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]"
                            >
                                VISITAR_PROYECTO
                                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                                <span className="absolute top-0 left-0 w-1 h-1 bg-white"></span>
                                <span className="absolute bottom-0 right-0 w-1 h-1 bg-white"></span>
                            </button>
                        ) : (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center gap-3 text-white text-xs font-bold tracking-[0.2em] uppercase border border-red-600 bg-red-600 hover:bg-red-500 hover:border-red-500 px-8 py-4 transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]"
                            >
                                VISITAR_PROYECTO
                                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                                <span className="absolute top-0 left-0 w-1 h-1 bg-white"></span>
                                <span className="absolute bottom-0 right-0 w-1 h-1 bg-white"></span>
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* VISUAL (IMAGEN) */}
                <div className="w-full lg:w-1/2 relative group order-1 lg:order-none">
                    <div className="relative aspect-video lg:aspect-[4/5] w-full overflow-hidden border border-red-900/30 bg-zinc-950 shadow-2xl">
                        <motion.div
                            style={mounted ? { y: yImage, scale: 1.05 } : { scale: 1.05 }}
                            className="absolute inset-0 w-full h-[110%] -top-[5%]"
                        >
                            <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-20" />
                            <div
                                className="absolute inset-0 opacity-40 transition-all duration-700 group-hover:opacity-60 z-0 bg-black"
                            />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
                            />
                            <div
                                className="absolute inset-0 opacity-40 mix-blend-overlay transition-all duration-700 group-hover:opacity-20 pointer-events-none"
                                style={{ background: `linear-gradient(135deg, ${project.color || '#ff0000'}99, transparent)` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/5 text-8xl lg:text-[10rem] font-black select-none group-hover:text-red-600/20 transition-colors duration-700">
                                    {project.title[0]}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Modal de Enlace Caído */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 w-full max-w-3xl bg-zinc-950 border border-red-900/50 p-1 shadow-[0_0_50px_rgba(255,0,0,0.2)]"
                    >
                        <div className="bg-black/50 p-8 border border-red-900/20 flex flex-col items-center gap-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-red-500 hover:text-white transition-colors"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <div className="flex items-center gap-3 w-full border-b border-red-900/30 pb-4">
                                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                                <span className="text-red-500 font-mono text-sm tracking-widest uppercase font-bold">
                                    ERROR // ENLACE CAÍDO
                                </span>
                            </div>

                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter w-full text-left">
                                {project.title}
                            </h3>

                            <img src="/caido.avif" alt="Sitio caido" className="w-full aspect-video object-cover border border-white/10 opacity-80" />

                            <p className="text-zinc-400 font-mono text-base text-left w-full mt-2">
                                <span className="text-red-500">{'>'}</span> El entorno en vivo para este proyecto no está disponible en este momento. Sin embargo, puedes consultar el código fuente en su repositorio.
                            </p>
                        </div>

                        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-600/50" />
                        <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-600/50" />
                        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-600/50" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-600/50" />
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export const ProjectList = () => {
    return (
        <div className="relative flex flex-col w-full bg-transparent">
            {PROJECTS.map((project, index) => (
                <ProjectItem key={project.id} project={project} index={index} />
            ))}
        </div>
    );
};