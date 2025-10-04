import { useState } from "react";
import { categories, subcategories, resources } from "../data/examples"
import { title, subtitle } from "../components/primitives";
import DefaultLayout from "../layouts/default";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { motion } from "framer-motion";

export default function IndexPage() {
  const [search, setSearch] = useState("");

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-row items-start justify-center gap-6 py-12 md:py-16 min-h-screen relative">
        {/* Sidebar */}
        <aside className="sticky top-24 left-0 h-fit flex flex-col gap-4 px-2 py-4 rounded-xl shadow-lg border border-violet-100 z-10">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#category-${category.id}`}
              className="flex flex-col items-center gap-1 group cursor-pointer hover:bg-violet-100 p-2 rounded transition"
              title={category.name}
            >
              <span className="text-2xl group-hover:scale-125 transition">{category.icon}</span>
              <span className="text-xs text-violet-700">{category.name}</span>
            </a>
          ))}
        </aside>

        {/* Main content */}
        <div className="inline-block max-w-5xl w-full text-center justify-center px-4">
          <h1 className={title({ color: "violet" })}>Dev resources</h1>
          <Input
            key="outside"
            label="Buscar"
            labelPlacement="outside"
            type="text"
            variant="bordered"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="my-6 max-w-md mx-auto"
            placeholder="Busca por nombre de recurso..."
          />
          <div>
            {categories.map((category) => {
              const visibleSubcategories = subcategories
                .filter((sub) => sub.categoryId === category.id)
                .map((sub) => {
                  const filteredResources = resources.filter(
                    (res) =>
                      res.subcategoryId === sub.id &&
                      res.title.toLowerCase().includes(search.toLowerCase())
                  );
                  return filteredResources.length > 0
                    ? { ...sub, resources: filteredResources }
                    : null;
                })
                .filter(Boolean);

              if (visibleSubcategories.length === 0) return null;

              return (
                <motion.div
                  key={category.id}
                  id={`category-${category.id}`} // <-- ID para el ancla
                  className="mb-10 scroll-mt-24"
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: 0.1 * Number(category.id) }}
                >
                  <h2 className="text-2xl font-bold flex items-center gap-2 mb-2 text-violet-700">
                    <span>{category.icon}</span>
                    {category.name}
                  </h2>
                  <Divider className="mb-4" />
                  <ul>
                    {visibleSubcategories.map((sub) => (
                      <motion.div
                        key={sub.id}
                        className="mb-6"
                        {...fadeInUp}
                        transition={{ duration: 0.5, delay: 0.2 * Number(sub.id) }}
                      >
                        <div className="text-lg font-semibold text-violet-500 mb-2">{sub.name}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {sub.resources.map((res) => (
                            <motion.div
                              key={res.id}
                              {...fadeInUp}
                              whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(124,58,237,0.15)" }}
                              transition={{ duration: 0.4, delay: 0.05 * Number(res.id) }}
                            >
                              <Card
                                className="max-w-[400px] shadow-lg rounded-xl border border-violet-100 bg-gray-950/20 transition-all duration-300"
                              >
                                <CardHeader className="flex gap-3">
                                  <p className="text-md font-bold text-violet-700">{res.title}</p>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                  <p className="text-gray-700">{res.description}</p>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                  <Link isExternal showAnchorIcon href={res.url} className="text-violet-600 font-medium">
                                    Link
                                  </Link>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          <div className={subtitle({ class: "mt-8 text-gray-400" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
