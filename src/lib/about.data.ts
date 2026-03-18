// Ruta recomendada: src/lib/about.data.ts

// 1. Definimos las interfaces para mantener una arquitectura limpia y tipada
export interface EducationItem {
    title: string;
    institution: string;
    year: string;
}

export interface SkillCategory {
    title: string;
    items: string[];
}

export interface AboutProfile {
    description: string;
    education: EducationItem[];
    categories: SkillCategory[];
}

// 2. Exportamos tu información estructurada
export const aboutData: AboutProfile = {
    description: "Autodidacta en profesionalización, entusiasta de la IA con fuertes bases en arquitecturas limpias, siempre en búsqueda de mejorar el performance, llevar un paso mas allá lo visual crear impacto en el usuario.",
    education: [
        // Tip: Como estamos en 2026, revisa si este año ya finalizó o sigue en curso
        { title: "Ingeniería de Software", institution: "Universidad Uniminuto", year: "2025 - en curso" },
        { title: "Análisis y Desarrollo de Software", institution: "SENA", year: "2026 - en curso" },
        { title: "Programación Básica (HTML, CSS, JS, Python)", institution: "MINTIC Bootcamp", year: "Completado" }
    ],
    categories: [
        {
            title: "FRAMEWORKS",
            items: ["React", "Next", "Vite", "Tailwind", "Bootstrap"]
        },
        {
            title: "LENGUAJES",
            items: ["HTML", "CSS", "TypeScript", "Python", "PHP", "C++", "Go"]
        },
        {
            title: "HERRAMIENTAS",
            items: ["Supabase", "MongoDB", "Git", "AWS"]
        },
        {
            title: "IA & COPILOTOS",
            items: ["OpenClawd", "ClaudeCode", "Antigravity", "Ollama", "VSCode:Continue"]
        }
    ]
};