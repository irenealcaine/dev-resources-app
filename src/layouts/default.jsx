import { Link } from "@heroui/link";
import { RiGithubLine, RiLinkedinBoxLine,RiMailAddLine   } from "react-icons/ri";

export default function DefaultLayout({ children }) {
  return (
    <div className="relative flex flex-col min-h-screen dark text-foreground bg-background ">
      <main className="container mx-auto max-w-7xl flex-grow ">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3 border-t border-gray-800">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://irenealcaienalvarez.es"
          title="Personal portfolio"
        >
          <span className="text-default-600">Hecho por</span>
          <p className="text-primary">Irene</p>
        </Link>
        <Link
        isExternal
          className="flex items-center gap-1 text-primary ml-2"
          href="https://irenealcaienalvarez.es"
          title="Personal GitHub"
        >
          <RiGithubLine/>
        </Link>
        <Link
        isExternal
          className="flex items-center gap-1 text-primary ml-2"
          href="https://www.linkedin.com/in/irenealcaine/"
          title="Personal LinkedIn"
        >
          <RiLinkedinBoxLine />
        </Link>
        <Link
        isExternal
          className="flex items-center gap-1 text-primary ml-2"
          href="mailto:irenealcainealvarez@gmail.com"
          title="Contacto"
        >
          <RiMailAddLine />
        </Link>
      </footer>
    </div>
  );
}
