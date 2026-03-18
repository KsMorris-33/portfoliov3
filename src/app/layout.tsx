import type { Metadata } from "next";
import "./globals.css";
import MeshBackground from "@/components/canvas/MeshGradient";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="antialiased bg-black text-white">
        <MeshBackground />

        {/* El contenedor principal DEBE ser relative para los cálculos de scroll */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          {/* Añadimos relative aquí también */}
          <main className="relative flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}