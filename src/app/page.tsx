import Hero from "@/components/home/Hero"
import { ProjectList } from "@/components/projects/ProjectSection"
import About from '@/components/about/AboutGrid';
import ContactForm from '@/components/contact/Form';


export default function Home() {
  return (
    <main className="relative">

      {/* Secciones */}
      <Hero />

      <section id="proyectos" className="relative z-10">
        <ProjectList />
      </section>

      <section id="sobre-mi" className="relative z-10">
        <About />
      </section>

      <section id="contacto" className="relative z-10">
        <ContactForm />
      </section>

    </main>
  );
}