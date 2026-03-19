# 🚀 Developer Portfolio

Welcome to my personal developer portfolio! This project is a modern, highly interactive web application built with a focus on performance, 3D aesthetics, and maintainable architecture.

## 🎯 Purpose

This portfolio is designed to showcase my technical skills, projects, and professional background to recruiters and engineering teams. It features a unique "cyberpunk/dark-red" aesthetic, integrating 3D elements, smooth animations, and a seamless user experience.

## 🛠️ Tech Stack & Architecture

This project is built using cutting-edge technologies to ensure a robust and scalable architecture:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) with Turbopack for ultra-fast compilation.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and developer experience.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for utility-first, responsive, and maintainable styling.
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei) to render interactive 3D canvas elements.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid, physics-based UI animations.
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/) for accessible, unstyled primitives.
- **Form Handling & Validation**: [Zod](https://zod.dev/) for strict client-side and server-side model validation.
- **Email Service**: [Resend](https://resend.com/) for reliable and secure contact form submissions via Server Actions.

## 📂 Project Structure

The codebase follows a modular and feature-centric architecture, ensuring separation of concerns and easy navigation:

```text
src/
├── app/                  # Next.js App Router (pages, layouts, and global styles)
├── components/           # UI Components organized by feature/domain
│   ├── about/            # Components for the About section (grid, skills, etc.)
│   ├── canvas/           # 3D interactive elements (Three.js/Fiber)
│   ├── contact/          # Contact form with Zod validation
│   ├── home/             # Hero section and landing features
│   ├── projects/         # Portfolio projects showcase
│   ├── shared/           # Reusable layout components (Navbar, Footer, etc.)
│   └── ui/               # Core atomic UI primitives (buttons, inputs, etc.)
├── hooks/                # Custom React hooks for shared logic
└── lib/                  # Utilities, Zod schemas, and Server Actions (e.g., Resend logic)
```

## 🧠 Key Architectural Decisions

1. **Feature-Sliced Design Approach**: 
   UI components are grouped by their specific domain (e.g., `contact`, `projects`, `canvas`). This keeps the Next.js `app/` directory clean and strictly focused on routing, while logic and markup live in isolated, testable component directories.
   
2. **Server Actions for Form Submissions**: 
   The contact form utilizes Next.js Server Actions (`src/lib/actions.ts`) paired with **Zod** for end-to-end type safety and validation. This eliminates the need for manual API routes and reduces client-side JavaScript.

3. **Performance Optimization**: 
   Utilizing **Next.js App Router** allows for aggressive static generation of pages. The 3D canvas elements are lazy-loaded and decoupled from the main DOM thread to ensure the initial page load remains lightning fast.

4. **Typesafe Email Handling**: 
   The integration with **Resend** uses strongly typed payloads and includes features like `replyTo`, ensuring seamless communication directly from the developer's email client.

## 🏃‍♂️ Running Locally

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with your Resend API Key:
   ```env
   RESEND_API_KEY=your_api_key_here
   ```
4. Start the development server (runs with Turbopack):
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 License

This project is licensed under the MIT License.
