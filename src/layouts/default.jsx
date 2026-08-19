import { Link } from "@heroui/link";
import { RiGithubLine, RiLinkedinBoxLine, RiMailAddLine } from "react-icons/ri";

export default function DefaultLayout({ children }) {
  return (
    <div className="relative flex flex-col min-h-screen dark text-foreground bg-background">
      <main className="flex-grow relative z-10">{children}</main>
      <footer className="w-full relative z-10 border-t border-divider">
        <div className="container mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <span className="text-default-500">© 2026 — Hecho por Irene</span>
          <div className="flex items-center gap-5 text-default-400">
            <Link
              isExternal
              className="text-default-400 hover:text-primary transition-colors"
              href="https://irenealcaienalvarez.es"
              title="Portfolio"
            >
              Portfolio
            </Link>
            <Link
              isExternal
              className="text-default-400 hover:text-primary transition-colors"
              href="https://github.com/irenealcaine"
              title="Personal GitHub"
            >
              <RiGithubLine />
            </Link>
            <Link
              isExternal
              className="text-default-400 hover:text-primary transition-colors"
              href="https://www.linkedin.com/in/irenealcaine/"
              title="Personal LinkedIn"
            >
              <RiLinkedinBoxLine />
            </Link>
            <Link
              isExternal
              className="text-default-400 hover:text-primary transition-colors"
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
