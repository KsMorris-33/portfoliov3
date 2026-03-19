"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import {
    Send,
    Terminal,
    Radio,
    User,
    Mail,
    MessageSquare,
    CheckCircle,
    AlertCircle,
    AlertTriangle
} from "lucide-react";
import { sendContactEmail } from "@/lib/actions";

// Esquema de validación usando Zod
const contactSchema = z.object({
    name: z.string().min(2, "Identificador muy corto (min 2 caract.)").max(100),
    email: z.string().email("Formato de dirección no válido"),
    message: z.string().min(10, "Payload muy corto (min 10 caract.)").max(5000, "Payload excede límite"),
});

type FormData = z.infer<typeof contactSchema>;
type FormStatus = "idle" | "sending" | "success" | "error";

const CONTACT_INFO = [
    { label: "Email", value: "kevinsmorrisr@gmail.com", icon: Mail },
    { label: "GitHub", value: "github.com/KsMorris-33", icon: Terminal },
    { label: "Estado", value: "Open to job, starving", icon: CheckCircle },
];

const fieldStyle =
    "w-full bg-zinc-950/80 border border-red-900/40 text-white placeholder-zinc-700 " +
    "font-mono text-sm px-4 py-3 outline-none resize-none rounded-sm " +
    "transition-all duration-300 " +
    "focus:border-red-500 focus:bg-black focus:shadow-[0_0_15px_rgba(255,0,0,0.15)]";

export default function ContactForm() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [serverError, setServerError] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Limpiamos error al escribir
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (status === "sending") return;

        // Validacion cliente (Zod)
        const result = contactSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: Partial<Record<keyof FormData, string>> = {};
            result.error.issues.forEach(issue => {
                const path = issue.path[0];
                if (path) {
                    fieldErrors[path as keyof FormData] = issue.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        setStatus("sending");
        setServerError(null);

        // Envío al servidor
        const response = await sendContactEmail(form);

        if (response.success) {
            setStatus("success");
            setForm({ name: "", email: "", message: "" });
        } else {
            setStatus("error");
            setServerError(typeof response.error === 'string' ? response.error : 'Fallo en la conexión cifrada.');
        }
    }

    function reset() {
        setStatus("idle");
        setErrors({});
        setServerError(null);
    }

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 border-b border-white/5 bg-transparent">
            {/* Grid de fondo */}

            {/* Efectos Lumínicos */}
            <div className="absolute top-1/2 -left-64 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 -right-64 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6">

                {/* ── Encabezado ── */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 space-y-6"
                >
                    <div className="flex items-center gap-4">
                        <Terminal className="w-10 h-10 md:w-12 md:h-12 text-red-600 animate-pulse drop-shadow-[0_0_12px_rgba(255,0,0,0.8)]" />
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase drop-shadow-[0_0_15px_rgba(255,0,0,0.2)]">
                            Con<span className="text-red-600">tacto</span>
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-500 opacity-75 ml-2 mt-2" />
                        </h2>
                    </div>

                    <div className="relative overflow-hidden max-w-3xl p-6 md:p-8 bg-red-950/10 border-l-4 border-red-600 backdrop-blur-sm group shadow-[0_0_30px_rgba(255,0,0,0.05)]">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 pointer-events-none" />
                        <p className="relative z-10 text-base md:text-lg text-red-50/80 leading-relaxed font-mono font-light">
                            <span className="text-red-500 font-bold mr-3">{">"}</span>
                            ¿Tienes un proyecto en mente? Solo escribeme y revisamos los detalles.
                            <span className="inline-block w-2.5 h-6 bg-red-500 ml-2 animate-pulse align-middle" />
                        </p>
                    </div>
                </motion.header>

                {/* ── Grid Principal ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                    {/* Lateral - Info */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-4 space-y-8"
                    >
                        <div className="flex items-center gap-3 border-b border-red-900/50 pb-4">
                            <Radio className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]" />
                            <h3 className="text-sm font-bold tracking-[0.2em] text-red-500 uppercase">
                                Redes_Activas
                            </h3>
                        </div>

                        <ul className="space-y-4">
                            {CONTACT_INFO.map(({ label, value, icon: Icon }) => (
                                <li
                                    key={label}
                                    className="group flex items-start gap-4 p-5 border border-white/5 hover:border-red-600/40 bg-black/60 transition-all duration-300 rounded-sm shadow-md"
                                >
                                    <Icon className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_#f00] transition-all" />
                                    <div>
                                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-red-500/70 mb-1.5">
                                            {label}
                                        </p>
                                        <p className="text-sm text-slate-300 font-mono break-all">{value}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.aside>

                    {/* Formulario */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-8"
                    >
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center gap-6 min-h-[460px] border border-red-600/30 bg-red-950/10 backdrop-blur-sm rounded-sm p-10 text-center shadow-[0_0_40px_rgba(255,0,0,0.05)]"
                            >
                                <CheckCircle className="w-20 h-20 text-red-500 drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]" />
                                <div className="space-y-3">
                                    <p className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">
                                        Transmisión Completa
                                    </p>
                                    <p className="text-slate-400 font-mono text-sm max-w-sm mx-auto">
                                        Enviado exitosamente. Me pondré en contacto contigo muy pronto!.
                                    </p>
                                </div>
                                <button
                                    onClick={reset}
                                    className="mt-4 group relative flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase border border-red-600/50 bg-red-600/10 hover:bg-red-600 hover:text-white px-8 py-4 transition-all duration-300 shadow-[inset_0_0_20px_rgba(255,0,0,0)] hover:shadow-[inset_0_0_20px_rgba(255,0,0,0.2)]"
                                >
                                    <Terminal className="w-4 h-4" />
                                    Nueva_Petición.exe
                                    <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-6 bg-black/40 p-6 md:p-8 border border-white/5 rounded-sm backdrop-blur-sm shadow-xl relative">

                                {/* Corner Decorations Form */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-600/50" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-600/50" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-600/50" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-600/50" />

                                {/* Campo: Nombre */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="contact-name"
                                        className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.3em] uppercase text-red-500/80"
                                    >
                                        <User className="w-3.5 h-3.5" />
                                        Nombre completo
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Miguel Ángel Durán"
                                            className={`${fieldStyle} ${errors.name ? 'border-red-500 bg-red-950/20' : ''}`}
                                            autoComplete="name"
                                        />
                                        {/* Corners in input */}
                                        <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l pointer-events-none transition-colors ${errors.name ? 'border-red-500' : 'border-red-900/40'}`} />
                                        <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r pointer-events-none transition-colors ${errors.name ? 'border-red-500' : 'border-red-900/40'}`} />
                                    </div>
                                    {errors.name && (
                                        <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" /> {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Campo: Email */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="contact-email"
                                        className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.3em] uppercase text-red-500/80"
                                    >
                                        <Mail className="w-3.5 h-3.5" />
                                        Dejame un correo para contactarte
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="usuario@servidor.com"
                                            className={`${fieldStyle} ${errors.email ? 'border-red-500 bg-red-950/20' : ''}`}
                                            autoComplete="email"
                                        />
                                        <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l pointer-events-none transition-colors ${errors.email ? 'border-red-500' : 'border-red-900/40'}`} />
                                        <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r pointer-events-none transition-colors ${errors.email ? 'border-red-500' : 'border-red-900/40'}`} />
                                    </div>
                                    {errors.email && (
                                        <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" /> {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Campo: Mensaje */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="contact-message"
                                        className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.3em] uppercase text-red-500/80"
                                    >
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        Tu mensaje
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="contact-message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Especificaciones..."
                                            rows={5}
                                            className={`${fieldStyle} ${errors.message ? 'border-red-500 bg-red-950/20' : ''}`}
                                        />
                                        <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l pointer-events-none transition-colors ${errors.message ? 'border-red-500' : 'border-red-900/40'}`} />
                                        <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r pointer-events-none transition-colors ${errors.message ? 'border-red-500' : 'border-red-900/40'}`} />
                                    </div>
                                    {errors.message && (
                                        <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" /> {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Acciones del formulario */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                                    <p className="text-[10px] font-mono text-zinc-500">
                                        Conexión protegida
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={status === "sending"}
                                        className="group relative inline-flex items-center justify-center gap-3 text-red-500 text-xs font-bold tracking-[0.2em] uppercase border border-red-600/50 bg-red-600/10 hover:bg-red-600 hover:text-white px-8 py-4 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden shadow-[0_0_15px_rgba(255,0,0,0.1)] hover:shadow-[0_0_25px_rgba(255,0,0,0.4)]"
                                    >
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:4px_4px] opacity-20 pointer-events-none" />

                                        <span className="relative z-10 flex items-center gap-2">
                                            {status === "sending" ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                    PROCESANDO...
                                                </>
                                            ) : (
                                                <>
                                                    ENVIAR
                                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </span>

                                        <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-red-500" />
                                        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-red-500" />
                                    </button>
                                </div>

                                {status === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-3 text-xs font-mono text-red-400 border border-red-900/50 bg-red-950/30 px-5 py-3 rounded-sm mt-4"
                                    >
                                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                                        <span>
                                            <strong className="block mb-0.5">FALLO DE TRANSACCIÓN:</strong>
                                            {serverError || "Error desconocido en el enlace de correo."}
                                        </span>
                                    </motion.div>
                                )}
                            </form>
                        )}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}