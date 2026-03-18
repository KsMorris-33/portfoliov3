import Hero from "@/components/home/Hero"
import { ProjectList } from "@/components/projects/ProjectSection"
import About from '@/components/about/AboutGrid';


export default function Home() {
  return (
    <main className="relative">

      {/* Secciones */}
      <Hero />

      <section id="proyectos" className="relative z-10">
        <ProjectList />
      </section>

      <section id="sobre-mi" className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 border-t border-white/5">
        <About />
      </section>

      <section id="contacto" className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 border-t border-white/5">
        <h2 className="text-4xl md:text-6xl font-bold font-mono text-white tracking-tighter mb-8">
          <span className="text-red-500 mr-4">&gt;</span>CONTACTO
        </h2>
        <p className="text-zinc-400 max-w-2xl text-center text-lg md:text-xl px-6">
          ¿Tienes un proyecto en mente? Hablemos.
        </p>
      </section>

    </main>
  );
}