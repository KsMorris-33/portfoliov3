"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PROJECTS, Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectItem = ({ project, index }: { project: Project; index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 0;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Parallax y Opacidad
    const yImage = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
    const yText = useTransform(smoothProgress, [0, 1], ["5%", "-5%"]);
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            id={project.id}
            ref={containerRef}
            // Mantenemos relative aquí para que useScroll mida correctamente
            className="relative min-h-fit lg:min-h-screen w-full flex items-center justify-center overflow-hidden py-24 lg:py-0 border-b border-white/5 bg-transparent"
        >
            <motion.div
                style={{ opacity }}
                className={cn(
                    "container mx-auto px-6 lg:px-20 flex flex-col gap-12 lg:gap-20 items-center",
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
            >
                {/* TEXTO */}
                <motion.div
                    style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? yText : 0 }}
                    className="w-full lg:w-1/2 flex flex-col space-y-6 order-2 lg:order-none"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-red-500 font-mono text-xs tracking-[0.3em] px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-sm">
                            {project.year}
                        </span>
                        <div className="h-[1px] w-12 bg-red-900/50" />
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                            DATA_SET_0{index + 1}
                        </span>
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

                    <div className="pt-6">
                        <button className="group relative flex items-center gap-3 text-red-500 text-xs font-bold tracking-[0.2em] uppercase border border-red-600/40 bg-red-600/5 hover:bg-red-600 hover:text-white px-8 py-4 transition-all duration-300">
                            EJECUTAR.PROYECTO_
                            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                            <span className="absolute top-0 left-0 w-1 h-1 bg-red-600"></span>
                            <span className="absolute bottom-0 right-0 w-1 h-1 bg-red-600"></span>
                        </button>
                    </div>
                </motion.div>

                {/* IMAGEN / VISUAL */}
                <div className="w-full lg:w-1/2 relative group order-1 lg:order-none">
                    <div
                        className="absolute -inset-4 rounded-full opacity-10 blur-[100px] transition-opacity group-hover:opacity-30 pointer-events-none"
                        style={{ backgroundColor: project.color || '#ff0000' }}
                    />
                    <div className="relative aspect-video lg:aspect-[4/5] w-full overflow-hidden border border-red-900/30 bg-zinc-950 shadow-2xl">
                        <motion.div
                            style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? yImage : 0, scale: 1.05 }}
                            className="absolute inset-0 w-full h-[110%] -top-[5%]"
                        >
                            {/* Scanlines */}
                            <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-20"></div>

                            <div
                                className="w-full h-full opacity-40 transition-all duration-700 group-hover:opacity-60 group-hover:scale-110"
                                style={{
                                    background: `linear-gradient(135deg, ${project.color || '#ff0000'}66, #000)`,
                                }}
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
        </section>
    );
};

export const ProjectList = () => {
    return (
        /* IMPORTANTE: Añadimos relative aquí para el contenedor de la lista */
        <div className="relative flex flex-col w-full bg-transparent">
            {PROJECTS.map((project, index) => (
                <ProjectItem key={project.id} project={project} index={index} />
            ))}
        </div>
    );
};