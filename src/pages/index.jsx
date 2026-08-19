import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@heroui/input";
import { FiArrowUpRight } from "react-icons/fi";

import DefaultLayout from "../layouts/default";
import { supabase } from "../../supabaseClient";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

export default function IndexPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*");
      const { data: subcategoriesData } = await supabase
        .from("subcategories")
        .select("*");
      const { data: resourcesData } = await supabase
        .from("resources")
        .select("*");

      setCategories(categoriesData || []);
      setSubcategories(subcategoriesData || []);
      setResources(resourcesData || []);
    };

    fetchData();
  }, []);

  const filteredResources = useMemo(
    () =>
      resources.filter((res) => {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          res.title.toLowerCase().includes(searchLower) ||
          res.description?.toLowerCase().includes(searchLower);
        const matchesCategory =
          activeCategory === "all" || res.categoryId === activeCategory;

        return matchesSearch && matchesCategory;
      }),
    [resources, search, activeCategory],
  );

  const categoryCounts = useMemo(() => {
    const counts = { all: filteredResources.length };

    categories.forEach((cat) => {
      counts[cat.id] = filteredResources.filter(
        (r) => r.categoryId === cat.id,
      ).length;
    });

    return counts;
  }, [filteredResources, categories]);

  const sections = useMemo(() => {
    const list = [];
    let counter = 0;
    const cats =
      activeCategory === "all"
        ? categories
        : categories.filter((c) => c.id === activeCategory);

    for (const cat of cats) {
      const catResources = filteredResources.filter(
        (r) => r.categoryId === cat.id,
      );

      if (catResources.length === 0) continue;

      list.push({ type: "category", name: cat.name });

      const subcatMap = {};

      catResources.forEach((r) => {
        const sub = subcategories.find((s) => s.id === r.subcategoryId);
        const key = sub ? sub.id : "none";

        if (!subcatMap[key])
          subcatMap[key] = { name: sub ? sub.name : "General", resources: [] };
        subcatMap[key].resources.push(r);
      });

      for (const subData of Object.values(subcatMap)) {
        list.push({ type: "subcat", name: subData.name });
        for (const res of subData.resources) {
          counter += 1;
          list.push({
            type: "resource",
            res,
            index: String(counter).padStart(2, "0"),
          });
        }
      }
    }

    return list;
  }, [filteredResources, categories, subcategories, activeCategory]);

  return (
    <DefaultLayout>
      <section className="relative min-h-screen">
        <div className="pointer-events-none fixed inset-0 bg-grid" />
        <div className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(212,255,63,0.06),transparent_65%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <motion.header
            animate="show"
            className="mb-12 lg:mb-16"
            initial="hidden"
          >
            <motion.div
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-primary"
              custom={0}
              variants={fadeUp}
            >
              <span className="h-px w-8 bg-primary" />
              índice de herramientas · dev
            </motion.div>
            <motion.h1
              className="mt-5 font-mono text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
              custom={1}
              variants={fadeUp}
            >
              dev<span className="text-primary">.</span>resources
            </motion.h1>
            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-default-500"
              custom={2}
              variants={fadeUp}
            >
              Una colección curada de herramientas, frameworks y referencias
              para construir software. Todo en un solo lugar, bien organizado.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm"
              custom={3}
              variants={fadeUp}
            >
              <div>
                <span className="text-primary">{resources.length}</span>{" "}
                <span className="text-default-500">recursos</span>
              </div>
              <div>
                <span className="text-primary">{categories.length}</span>{" "}
                <span className="text-default-500">categorías</span>
              </div>
              <div>
                <span className="text-primary">{subcategories.length}</span>{" "}
                <span className="text-default-500">subcategorías</span>
              </div>
            </motion.div>
          </motion.header>

          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16">
            <aside className="hidden lg:block">
              <nav
                aria-label="Categorías"
                className="sticky top-10 max-h-[calc(100vh-5rem)] overflow-y-auto"
              >
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-default-600">
                  índice
                </p>
                <ul className="flex flex-col gap-1">
                  <li>
                    <button
                      aria-current={
                        activeCategory === "all" ? "true" : undefined
                      }
                      className={`flex w-full items-baseline gap-3 border-l-2 px-3 py-2 text-left font-mono text-sm transition-colors ${
                        activeCategory === "all"
                          ? "border-primary text-primary"
                          : "border-transparent text-default-500 hover:text-foreground"
                      }`}
                      onClick={() => setActiveCategory("all")}
                    >
                      <span className="text-[11px] opacity-70">00</span>
                      <span>todos</span>
                      <span className="ml-auto text-[11px] text-default-600">
                        {categoryCounts.all}
                      </span>
                    </button>
                  </li>
                  {categories.map((cat, i) => (
                    <li key={cat.id}>
                      <button
                        aria-current={
                          activeCategory === cat.id ? "true" : undefined
                        }
                        className={`flex w-full items-baseline gap-3 border-l-2 px-3 py-2 text-left font-mono text-sm transition-colors ${
                          activeCategory === cat.id
                            ? "border-primary text-primary"
                            : "border-transparent text-default-500 hover:text-foreground"
                        }`}
                        onClick={() => setActiveCategory(cat.id)}
                      >
                        <span className="text-[11px] opacity-70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="lowercase">{cat.name}</span>
                        <span className="ml-auto text-[11px] text-default-600">
                          {categoryCounts[cat.id] ?? 0}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <main>
              <div className="lg:hidden -mx-4 mb-8 overflow-x-auto px-4">
                <div className="flex w-max gap-2">
                  <button
                    aria-pressed={activeCategory === "all"}
                    className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
                      activeCategory === "all"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-divider text-default-500 hover:border-default-500"
                    }`}
                    onClick={() => setActiveCategory("all")}
                  >
                    todos
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      aria-pressed={activeCategory === cat.id}
                      className={`rounded-full border px-4 py-1.5 font-mono text-xs lowercase transition-colors ${
                        activeCategory === cat.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-divider text-default-500 hover:border-default-500"
                      }`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <Input
                  classNames={{
                    label:
                      "font-mono text-[10px] uppercase tracking-[0.3em] text-default-600",
                    inputWrapper: "font-mono",
                    input: "font-mono text-sm placeholder:text-default-600",
                  }}
                  label="buscar"
                  labelPlacement="outside"
                  placeholder="por nombre o descripción…"
                  type="text"
                  value={search}
                  variant="underlined"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <p aria-live="polite" className="sr-only" role="status">
                  {filteredResources.length} recursos encontrados
                </p>
              </div>

              {filteredResources.length === 0 && (
                <div className="mt-20 flex flex-col items-center gap-2 text-center font-mono text-sm text-default-500">
                  <span className="text-primary">{"// sin resultados"}</span>
                  <span>No se encontraron recursos para «{search}».</span>
                </div>
              )}

              {sections.map((item, i) => {
                if (item.type === "category")
                  return (
                    <div
                      key={`cat-${item.name}-${i}`}
                      className="mb-1 mt-12 flex items-baseline gap-4 first:mt-0"
                    >
                      <h2 className="font-mono text-xl font-bold text-foreground sm:text-2xl">
                        {item.name}
                      </h2>
                      <span className="h-px flex-1 self-center bg-divider" />
                    </div>
                  );

                if (item.type === "subcat")
                  return (
                    <div
                      key={`sub-${item.name}-${i}`}
                      className="mt-8 mb-2 flex items-center gap-3"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                        {"//"}
                      </span>
                      <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-default-500">
                        {item.name}
                      </h3>
                    </div>
                  );

                return (
                  <motion.a
                    key={item.res.id}
                    aria-label={`${item.res.title} — ${item.res.description} (se abre en pestaña nueva)`}
                    className="group -mx-3 grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-divider px-3 py-4 transition-colors duration-200 hover:bg-content1/70"
                    href={item.res.url}
                    initial={{ opacity: 0, y: 10 }}
                    rel="noreferrer"
                    target="_blank"
                    transition={{
                      duration: 0.35,
                      delay: (i % 6) * 0.04,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <span className="font-mono text-[11px] text-default-600 transition-colors group-hover:text-primary">
                      {item.index}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-foreground transition-colors group-hover:text-primary">
                        {item.res.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-snug text-default-500">
                        {item.res.description}
                      </span>
                    </span>
                    <FiArrowUpRight className="h-4 w-4 text-default-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </motion.a>
                );
              })}
            </main>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
