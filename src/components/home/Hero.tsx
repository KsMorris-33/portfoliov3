"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Terminal, Cpu, Fingerprint } from "lucide-react";

export default function Hero() {
    // Variantes para animar la entrada de los elementos
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const glitchVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        },
        glitch: {
            x: [0, -2, 2, -2, 0, 1, -1, 0],
            y: [0, 1, -1, 2, -2, 0, -1, 0],
            opacity: [1, 0.8, 1, 0.9, 1, 0.7, 1],
            filter: [
                "drop-shadow(0 0 15px rgba(255,0,0,0.3))",
                "drop-shadow(2px 0 10px rgba(255,50,0,0.8)) hue-rotate(90deg)",
                "drop-shadow(-2px 0 10px rgba(255,0,0,0.8))",
                "drop-shadow(0 0 15px rgba(255,0,0,0.3))"
            ],
            transition: { duration: 0.4, repeat: Infinity, repeatDelay: 3 }
        }
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
            {/* Esquinas / HUD*/}
            <div className="absolute top-10 left-10 w-16 h-16 border-l-2 border-t-2 border-red-500/30 opacity-60 hidden sm:block delay-100 transition-all" />
            <div className="absolute top-10 right-10 w-16 h-16 border-r-2 border-t-2 border-red-500/30 opacity-60 hidden sm:block delay-200 transition-all" />
            <div className="absolute bottom-10 left-10 w-16 h-16 border-l-2 border-b-2 border-red-500/30 opacity-60 hidden sm:block delay-300 transition-all" />
            <div className="absolute bottom-10 right-10 w-16 h-16 border-r-2 border-b-2 border-red-500/30 opacity-60 hidden sm:block delay-500 transition-all" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-5xl w-full text-center space-y-8 z-10"
            >
                {/* Badge superior tipo Terminal */}
                <motion.div variants={itemVariants} className="flex justify-center">
                    <div className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/40 bg-red-950/30 backdrop-blur-md text-red-400 text-xs font-mono tracking-widest uppercase overflow-hidden shadow-[0_0_15px_rgba(255,0,0,0.15)]">
                        <Terminal size={14} className="group-hover:animate-pulse text-red-500" />
                        <span>System.Status: Online</span>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.9)]" />

                        {/* Escáner de luz pasando */}
                        <motion.div
                            className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>

                {/* Título Principal estilo Glitch */}
                <motion.div variants={itemVariants} className="space-y-4 relative">
                    <h2 className="text-red-500/80 text-sm md:text-base font-mono tracking-[0.3em] uppercase">
                        // NEURAL.DEV_INTERACTION
                    </h2>

                    <motion.h1
                        variants={glitchVariants}
                        animate={["visible", "glitch"]}
                        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white relative inline-block drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                    >
                        KSM<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 drop-shadow-[0_0_25px_rgba(255,0,0,0.8)]">_DEV</span>
                    </motion.h1>
                </motion.div>

                {/* Descripción Técnica */}
                <motion.div
                    variants={itemVariants}
                    className="max-w-3xl mx-auto space-y-4"
                >
                    <p className="text-slate-400 text-base md:text-xl leading-relaxed font-light font-mono text-center">
                        <span className="text-red-500/70 mr-2">&gt;</span>Inicializando secuencias creativas...
                        <br className="hidden sm:block" />
                        Especializado en construir interfaces donde el <span className="text-red-400 font-bold drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">código</span> se sincroniza con el diseño 3D interactivo. Conectando front-end con lógica neuronal.
                    </p>
                </motion.div>

                {/* Botones de Acción Estilo Cyber */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
                >
                    <Button
                        size="lg"
                        className="group relative h-14 px-8 rounded-none border border-red-500 bg-red-600/10 hover:bg-red-600/20 text-red-500 hover:text-red-400 font-mono font-bold tracking-widest uppercase transition-all overflow-hidden shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]"
                    >
                        {/* Patron de red interior */}
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.5)_1px,transparent_1px)] bg-[size:4px_4px] group-hover:bg-[size:6px_6px] transition-all" />

                        <span className="relative z-10 flex items-center gap-2">
                            <Cpu size={18} /> Iniciar_Sistema <ChevronDown className="group-hover:translate-y-1 transition-transform" />
                        </span>

                        <motion.div
                            className="absolute inset-0 bg-red-500/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.4 }}
                        />
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="group h-14 px-8 rounded-none border border-white/20 hover:border-red-500/60 bg-black/40 backdrop-blur-md hover:bg-white/5 text-white hover:text-red-300 font-mono uppercase tracking-widest transition-all shadow-[0_0_0_rgba(255,0,0,0)] hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                    >
                        <span className="flex items-center gap-2">
                            <Fingerprint size={18} className="text-slate-500 group-hover:text-red-400 group-hover:animate-pulse transition-colors" /> Identificarse
                        </span>
                    </Button>
                </motion.div>
            </motion.div>

            {/* Indicador de Scroll Inferior Técnico */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="flex flex-col items-center animate-bounce">
                    <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-red-500/60 rotate-90 mb-10 origin-left">Scroll</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-red-500/80 to-transparent shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                </div>
            </motion.div>
        </section>
    );
}