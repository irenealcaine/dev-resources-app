import { Link } from "@heroui/link";

export default function DefaultLayout({ children }) {
  return (
    <div className="relative flex flex-col min-h-screen dark text-foreground bg-background">
      <main className="container mx-auto max-w-7xl flex-grow ">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com"
          title="heroui.com homepage"
        >
          <span className="text-default-600">Made by</span>
          <p className="text-primary">Irene</p>
        </Link>
      </footer>
    </div>
  );
}
