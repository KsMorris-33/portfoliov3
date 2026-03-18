"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS, Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";

const ProjectItem = ({ project, index }: { project: Project; index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Efectos de Parallax
    const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const yContent = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            id={project.id}
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black border-b border-white/5"
        >
            <motion.div
                style={{ opacity }}
                className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                {/* Información del Proyecto */}
                <motion.div style={{ y: yContent }} className="order-2 lg:order-1 z-10">
                    <span className="text-zinc-500 font-mono text-lg mb-2 block">
                        {project.year} / 0{index + 1}
                    </span>
                    <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
                        {project.title}
                    </h2>
                    <p className="text-zinc-400 text-xl max-w-md mb-8 leading-relaxed">
                        {project.description}
                    </p>
                    <div className="flex gap-3 flex-wrap mb-10">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-zinc-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 text-white font-bold group border-b-2 border-white/20 pb-1 hover:border-white transition-all">
                        VER PROYECTO <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </motion.div>

                {/* Visual del Proyecto (Parallax Image) */}
                <div className="order-1 lg:order-2 relative aspect-square lg:aspect-[4/5] w-full group">
                    <div className="absolute inset-0 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                        <motion.div
                            style={{ y: yImage, scale: 1.1 }}
                            className="absolute inset-0 w-full h-[130%] -top-[15%]"
                        >
                            {/* Color de acento de fondo */}
                            <div
                                className="w-full h-full opacity-40 mix-blend-overlay"
                                style={{ backgroundColor: project.color }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800/50">
                                <span className="text-white/5 text-[15rem] font-black select-none">
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
        <div className="flex flex-col">
            {PROJECTS.map((project, index) => (
                <ProjectItem key={project.id} project={project} index={index} />
            ))}
        </div>
    );
};