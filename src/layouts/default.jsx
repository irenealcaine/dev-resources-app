import { Link } from "@heroui/link";
import { RiGithubLine, RiLinkedinBoxLine, RiMailAddLine } from "react-icons/ri";

export default function DefaultLayout({ children }) {
  return (
    <div className="relative flex flex-col min-h-screen dark text-foreground bg-background">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-primary-foreground"
        href="#main"
      >
        Saltar al contenido
      </a>
      <main className="flex-grow relative z-10 scroll-mt-6" id="main">
        {children}
      </main>
      <footer className="w-full relative z-10 border-t border-divider">
        <div className="container mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <span className="text-default-500">© 2026 — Hecho por Irene</span>
          <div className="flex items-center gap-4 text-default-500">
            <Link
              isExternal
              aria-label="Portfolio (se abre en pestaña nueva)"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-default-500 hover:text-primary transition-colors"
              href="https://irenealcaienalvarez.es"
              title="Portfolio"
            >
              Portfolio
            </Link>
            <Link
              isExternal
              aria-label="GitHub (se abre en pestaña nueva)"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-default-500 hover:text-primary transition-colors"
              href="https://github.com/irenealcaine"
              title="Personal GitHub"
            >
              <RiGithubLine />
            </Link>
            <Link
              isExternal
              aria-label="LinkedIn (se abre en pestaña nueva)"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-default-500 hover:text-primary transition-colors"
              href="https://www.linkedin.com/in/irenealcaine/"
              title="Personal LinkedIn"
            >
              <RiLinkedinBoxLine />
            </Link>
            <Link
              isExternal
              aria-label="Contacto por correo"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-default-500 hover:text-primary transition-colors"
              href="mailto:irenealcainealvarez@gmail.com"
              title="Contacto"
            >
              <RiMailAddLine />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
