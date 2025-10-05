import { useState } from "react";
import { categories, subcategories, resources } from "../data/examples";
import DefaultLayout from "../layouts/default";
import { Input } from "@heroui/input";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { subtitle, title } from "../components/primitives";

export default function IndexPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filtra recursos por búsqueda y categoría
  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || res.categoryId === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Obtiene el nombre de la subcategoría para cada recurso
  const getSubcategoryName = (subcategoryId) =>
    subcategories.find((sub) => sub.id === subcategoryId)?.name || "";

  // Agrupa recursos por categoría
  const resourcesByCategory = categories.reduce((acc, cat) => {
    acc[cat.id] = filteredResources.filter((res) => res.categoryId === cat.id);
    return acc;
  }, {});

  // Título principal dinámico
  const mainTitle =
    activeCategory === "all"
      ? "Dev Resources"
      : categories.find((cat) => cat.id === activeCategory)?.name || "Dev Resources";

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen bg-gray-950">
        <div className="w-full max-w-xl mx-auto px-4">
          <h1 className={title({ color: "blue" })}>{mainTitle}</h1>
          <Input
            key="outside"
            labelPlacement="outside"
            type="text"
            variant="bordered"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-4 w-full"
            placeholder="Search for resources"
          />

          {/* Navbar de categorías con Tabs de HeroUI */}
          <Tabs
            selectedKey={activeCategory}
            onSelectionChange={setActiveCategory}
            variant="underlined"
            className="mb-8"
          >
            <Tab
              key="all"
              title="All"
              className="text-base px-2 pb-1"
              classNames={{
                tab: activeCategory === "all"
                  ? "border-blue-500 text-white font-semibold"
                  : "border-transparent text-gray-400"
              }}
            />
            {categories.map((cat) => (
              <Tab
                key={cat.id}
                title={cat.name}
                className="text-base px-2 pb-1"
                classNames={{
                  tab: activeCategory === cat.id
                    ? "border-blue-500 text-white font-semibold"
                    : "border-transparent text-gray-400"
                }}
              />
            ))}
          </Tabs>

          {/* Cards de recursos */}
          <div className="flex flex-col gap-8">
            {filteredResources.length === 0 && (
              <div className="text-gray-400 text-center py-8">No resources found.</div>
            )}

            {activeCategory === "all"
              ? categories.map((cat) =>
                resourcesByCategory[cat.id].length > 0 ? (
                  <div key={cat.id}>
                    <h2 className={subtitle({ class: "mb-2 text-gray-400" })}>{cat.name}</h2>
                    <div className="flex flex-col gap-6">
                      {resourcesByCategory[cat.id].map((res) => (
                        <Card
                          key={res.id}
                          isPressable
                          onPress={() => window.open(res.url, "_blank")}
                          className="bg-gray-900 rounded-xl shadow border border-gray-800 text-left"
                        >
                          <CardHeader>
                            <span className="text-xs font-bold text-blue-400 uppercase">
                              {getSubcategoryName(res.subcategoryId)}
                            </span>
                          </CardHeader>
                          <CardBody>
                            <div className="text-lg font-semibold text-white mb-1">
                              {res.title}
                            </div>
                            <div className="text-gray-400 mb-2">{res.description}</div>
                          </CardBody>

                        </Card>
                      ))}
                    </div>
                  </div>
                ) : null
              )
              : filteredResources.map((res) => (
                <Card
                  key={res.id}
                  className="bg-gray-900 rounded-xl shadow border border-gray-800 text-left"
                >
                  <CardHeader>
                    <span className="text-xs font-bold text-blue-400 uppercase">
                      {getSubcategoryName(res.subcategoryId)}
                    </span>
                  </CardHeader>
                  <CardBody>
                    <div className="text-lg font-semibold text-white mb-1">
                      {res.title}
                    </div>
                    <div className="text-gray-400 mb-2">{res.description}</div>
                  </CardBody>
                  <CardFooter>
                    <Button
                      as="a"
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      variant="light"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Visit resource
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
