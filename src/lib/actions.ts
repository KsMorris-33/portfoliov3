"use server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z.string().min(2, "Identificador muy corto (min 2 caract.)").max(100),
    email: z.string().email("Formato de dirección no válido"),
    message: z.string().min(10, "Payload muy corto (min 10 caract.)").max(5000, "Payload excede límite"),
});

export async function sendContactEmail(formData: { name: string; email: string; message: string }) {
    try {
        // Validación en Servidor (Zod)
        const validated = contactSchema.safeParse(formData);

        if (!validated.success) {
            return {
                success: false,
                error: "Datos de formulario inválidos.",
                fieldErrors: validated.error.flatten().fieldErrors
            };
        }

        const { name, email, message } = validated.data;

        const { data, error } = await resend.emails.send({
            from: "Contacto Web <onboarding@resend.dev>", // Por ahora no hay dominio propio
            to: ["kevin_u3@hotmail.com"], // Tu correo real
            replyTo: email, // Permite responder directamente al usuario
            subject: `SISTEMA: Nuevo mensaje de ${name}`,
            text: `IDENTIFICADOR: ${name}\nCORREO: ${email}\n\nPAYLOAD:\n${message}`,
        });

        if (error) return { success: false, error: error.message };
        return { success: true, data };
    } catch (err) {
        return { success: false, error: "Error en el servidor al enviar el correo." };
    }
}