export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    color: string;
    year: string;
}

export const PROJECTS: Project[] = [
    {
        id: "neural-nexus",
        title: "Neural Nexus",
        description: "Plataforma de visualización de redes neuronales en tiempo real con integración de WebGL.",
        tags: ["Next.js", "Three.js", "Python"],
        image: "/projects/p1.jpg",
        color: "#3b82f6", // Blue
        year: "2024"
    },
    {
        id: "crypto-vault",
        title: "Crypto Vault",
        description: "Dashboard avanzado para la gestión de activos digitales y análisis de mercado on-chain.",
        tags: ["TypeScript", "Tailwind", "Ethers.js"],
        image: "/projects/p2.jpg",
        color: "#10b981", // Emerald
        year: "2024"
    },
    {
        id: "quantum-ui",
        title: "Quantum UI",
        description: "Librería de componentes de diseño atómico optimizada para aplicaciones de alto rendimiento.",
        tags: ["React", "Framer Motion", "Vite"],
        image: "/projects/p3.jpg",
        color: "#f59e0b", // Amber
        year: "2023"
    },
    {
        id: "eco-track",
        title: "Eco Track",
        description: "Aplicación móvil para el seguimiento de la huella de carbono utilizando datos satelitales.",
        tags: ["React Native", "Firebase", "Maps API"],
        image: "/projects/p4.jpg",
        color: "#ef4444", // Red
        year: "2023"
    },
    {
        id: "void-editor",
        title: "Void Editor",
        description: "Editor de código minimalista basado en la web con soporte para colaboración en vivo.",
        tags: ["WebSockets", "Monaco Editor", "Node.js"],
        image: "/projects/p5.jpg",
        color: "#8b5cf6", // Violet
        year: "2024"
    }
];