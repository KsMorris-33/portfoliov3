"use client";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
    { title: "NEXUS AI", tags: ["Next.js", "Three.js"], image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop" },
    { title: "RED VOID", tags: ["GLSL", "React"], image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop" },
    { title: "KRONOS", tags: ["Tailwind", "GSAP"], image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop" },
];

export default function Projects() {
    return (
        <section id="proyectos" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Título de Sección con estilo Vertical */}
                <div className="flex flex-col md:flex-row items-end gap-8 mb-20">
                    <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-white/5 uppercase">
                        Work
                    </h2>
                    <div className="mb-4">
                        <p className="text-red-500 font-mono text-sm tracking-widest uppercase mb-2">// Seleccionados</p>
                        <p className="max-w-xs text-zinc-500 text-sm">
                            Una colección de experimentos visuales y soluciones digitales de alto rendimiento.
                        </p>
                    </div>
                </div>

                {/* Grid Creativo */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className={index === 1 ? "lg:mt-20" : ""} // Desfase para dinamismo
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}