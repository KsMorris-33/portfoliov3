"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Terminal, Cpu, CheckCircle2, X } from "lucide-react";

export default function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Variantes para el botón Glitch
    const buttonGlitchVariants = {
        glitch: {
            x: [0, -2, 2, -1, 0, 1, -2, 0],
            y: [0, 1, -1, 0, 1, -1, 0],
            filter: [
                "drop-shadow(0 0 5px rgba(255,0,0,0.5))",
                "drop-shadow(-3px 0 0 rgba(255,0,0,1))",
                "drop-shadow(3px 0 0 rgba(0,255,255,0.7))",
                "drop-shadow(0 0 5px rgba(255,0,0,0.5))",
            ],
            transition: {
                duration: 0.3,
                repeat: Infinity,
                repeatType: "mirror" as const,
            }
        },
        stable: {
            x: 0,
            y: 0,
            filter: "drop-shadow(0 0 0px rgba(255,0,0,0))",
            transition: { duration: 0.2 }
        }
    };

    const handleDownload = () => {
        // 1. Abrir Modal
        setShowModal(true);

        // 2. Ejecutar descarga
        const link = document.createElement('a');
        link.href = '/cv-kevin.pdf';
        link.download = 'cv-kevin.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Variantes de entrada (las tuyas originales)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
        visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } },
    };

    return (
        <section id="inicio" className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-transparent">

            {/* Modal de Agradecimiento */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-zinc-950 border border-red-600/50 p-8 max-w-md w-full shadow-[0_0_50px_rgba(255,0,0,0.2)] overflow-hidden"
                        >
                            {/* Decoración Modal */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse" />
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-red-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600">
                                    <CheckCircle2 className="text-red-500 w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Gracias por tu interés</h3>
                                <p className="text-zinc-400 font-mono text-sm">
                                    Mi curriculum <span className="text-red-500">cv-kevin.pdf</span> ha sido descargado con éxito.
                                </p>
                                <Button
                                    onClick={() => setShowModal(false)}
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-none w-full font-bold tracking-widest uppercase"
                                >
                                    Cerrar
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ... HUD Corners ... */}
            <div className="absolute top-10 left-10 w-16 h-16 border-l-2 border-t-2 border-red-500/30 opacity-60 hidden sm:block" />
            <div className="absolute top-10 right-10 w-16 h-16 border-r-2 border-t-2 border-red-500/30 opacity-60 hidden sm:block" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-5xl w-full text-center space-y-8 z-10"
            >
                {/* Badge Superior */}
                <motion.div variants={itemVariants} className="flex justify-center">
                    <div className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/40 bg-red-950/30 backdrop-blur-md text-red-400 text-xs font-mono tracking-widest uppercase overflow-hidden">
                        <Terminal size={14} className="text-red-500" />
                        <span>System.Status: Online</span>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.9)]" />
                    </div>
                </motion.div>

                {/* Título */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h2 className="text-red-500/80 text-sm font-mono tracking-[0.3em] uppercase">// FULLSTACK</h2>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                        KSM<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 drop-shadow-[0_0_25px_rgba(255,0,0,0.8)]">_DEV</span>
                    </h1>
                </motion.div>

                {/* Botón con Glitch */}
                <motion.div variants={itemVariants} className="flex justify-center pt-6">
                    <motion.div
                        animate={isHovered || showModal ? "stable" : "glitch"}
                        variants={buttonGlitchVariants}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Button
                            onClick={handleDownload}
                            size="lg"
                            className="group relative h-16 px-10 rounded-none border-2 border-red-600 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-mono font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.2)]"
                        >
                            {/* Grid Interior */}
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.5)_1px,transparent_1px)] bg-[size:4px_4px]" />

                            <span className="relative z-10 flex items-center gap-3">
                                <Cpu size={20} className={isHovered ? "" : "animate-spin-slow"} />
                                DESCARGAR_CV.SYS
                            </span>

                            {/* Esquinas decorativas */}
                            <div className="absolute -top-[2px] -left-[2px] w-2 h-2 bg-red-500" />
                            <div className="absolute -bottom-[2px] -right-[2px] w-2 h-2 bg-red-500" />
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-red-500/60 rotate-90 mb-10 origin-left">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-red-500/80 to-transparent shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
            </motion.div>
        </section>
    );
}