"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";

interface ProjectProps {
    title: string;
    tags: string[];
    image: string;
}

export default function ProjectCard({ title, tags, image }: ProjectProps) {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-red-500/20 shadow-2xl transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
        >
            {/* Imagen de fondo con Overlay Rojo */}
            <div className="absolute inset-0 z-0">
                <img src={image} alt={title} className="h-full w-full object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Contenido */}
            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <motion.div className="flex gap-2 mb-4">
                    {tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-tighter px-2 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-red-500 font-mono">
                            {tag}
                        </span>
                    ))}
                </motion.div>

                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter group-hover:text-red-500 transition-colors">
                    {title}
                </h3>

                <div className="flex gap-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Github className="w-5 h-5 text-zinc-400 hover:text-red-500 cursor-pointer" />
                    <ExternalLink className="w-5 h-5 text-zinc-400 hover:text-red-500 cursor-pointer" />
                    <div className="ml-auto flex items-center gap-1 text-[10px] font-mono text-red-500/60 uppercase">
                        <Code2 size={12} /> View Case
                    </div>
                </div>
            </div>

            {/* Efecto de Brillo Rojo "Scanning" */}
            <motion.div
                animate={{ top: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-red-500/10 to-transparent -z-1"
            />
        </motion.div>
    );
}