export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    color: string;
    year: string;
    liveLink?: string;
    repoLink?: string;
}

export const PROJECTS: Project[] = [
    {
        id: "Ecommerce",
        title: "XueTech Store v3",
        description: "Ecommerce de emprendimiento propio con herramientas CMS y autenticación",
        tags: ["Next.js", "PostgreSQL", "Supabase"],
        image: "/projects/p1.avif",
        color: "#3b82f6", // Blue
        year: "2026",
        liveLink: "null",
        repoLink: "https://github.com/KsMorris-33/xt9"
    },
    {
        id: "Ecommerce2",
        title: "XueTech Store v2",
        description: "Ecommerce simple y completo con registro, login, carrito y pagos",
        tags: ["Javascript", "Tailwind v3", "EmailJS"],
        image: "/projects/p2.avif",
        color: "#10b981", // Emerald
        year: "2023",
        liveLink: "https://xuetech.onrender.com/",
        repoLink: "https://github.com/xue-tech/xue-tech-store"

    },
    {
        id: "Proyecto investigacion emprendimiento Soacha",
        title: "Emprender",
        description: "Trabajo de grupo diplomado MINTIC",
        tags: ["Next.js", "Github", "Light/dark theme"],
        image: "/projects/p3.avif",
        color: "#f59e0b", // Amber
        year: "2026",
        liveLink: "null",
        repoLink: "https://github.com/KsMorris-33/emprendamos"
    },
    {
        id: "Portfolio v2",
        title: "Portfolio v2",
        description: "Portfolio personal con animaciones, elementos 3D y transiciones",
        tags: ["React", "Tailwind", "Vite"],
        image: "/projects/p4.avif",
        color: "#ef4444", // Red
        year: "2024",
        liveLink: "https://ksmorris-33.github.io/portfoliov2/",
        repoLink: "https://github.com/KsMorris-33/portfoliov2"
    },
    {
        id: "MyFirstWeb",
        title: "Who I am",
        description: "Pagina personal",
        tags: ["HTML", "CSS", "Javascript"],
        image: "/projects/p5.avif",
        color: "#8b5cf6", // Violet
        year: "2022",
        liveLink: "https://ksmorris-33.github.io/kevinmorris/",
        repoLink: "https://github.com/KsMorris-33/kevinmorris"
    }
];