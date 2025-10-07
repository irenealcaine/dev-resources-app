import { useState } from "react";
import { categories, subcategories, resources } from "../data/examples";
import DefaultLayout from "../layouts/default";
import { Input } from "@heroui/input";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { subtitle, title } from "../components/primitives";
import { useEffect } from "react";

import { supabase } from "../../supabaseClient";

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

      // console.log({ categoriesData, subcategoriesData, resourcesData });
    };

    fetchData();
  }, []);

  // Filtra recursos por búsqueda (en nombre y descripción) y categoría
  const filteredResources = resources.filter((res) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      res.title.toLowerCase().includes(searchLower) ||
      res.description?.toLowerCase().includes(searchLower);
    const matchesCategory =
      activeCategory === "all" || res.categoryId === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Obtiene el nombre de la subcategoría para cada recurso
  const getSubcategoryName = (subcategoryId) =>
    subcategories.find((sub) => sub.id === subcategoryId)?.name || "";

  // Agrupa recursos por categoría y subcategoría
  const resourcesByCategory = categories.reduce((acc, cat) => {
    // Filtra recursos de la categoría
    const catResources = filteredResources.filter((res) => res.categoryId === cat.id);
    // Agrupa por subcategoría
    const groupedBySubcat = subcategories.reduce((subAcc, subcat) => {
      const subcatResources = catResources.filter((res) => res.subcategoryId === subcat.id);
      if (subcatResources.length > 0) {
        subAcc[subcat.id] = {
          name: subcat.name,
          resources: subcatResources,
        };
      }
      return subAcc;
    }, {});
    acc[cat.id] = groupedBySubcat;
    return acc;
  }, {});

  // Título principal dinámico
  const mainTitle =
    activeCategory === "all"
      ? "Dev Resources"
      : categories.find((cat) => cat.id === activeCategory)?.name ||
        "Dev Resources";

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4 py-8 md:py-10 min-h-screen bg-linear-to-r from-black via-gray-900 to-black">
        <div className="w-full max-w-xl md:max-w-6xl mx-auto px-4">
          <h1 className={title({ color: "blue" })}>{mainTitle}</h1>
          <Input
            key="outside"
            labelPlacement="outside"
            type="text"
            variant="bordered"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 w-full max-w-xl"
            label="Buscar recursos"
          />

          {/* Contenedor scrollable para móviles */}
          <div className="overflow-x-auto">
            <Tabs
              selectedKey={activeCategory}
              onSelectionChange={setActiveCategory}
              variant="underlined"
              className="min-w-max mb-4"
            >
              <Tab
                key="all"
                title="All"
                className="text-base px-2 pb-1"
                classNames={{
                  tab:
                    activeCategory === "all"
                      ? "border-blue-500 text-white font-semibold"
                      : "border-transparent text-gray-400",
                }}
              />
              {categories.map((cat) => (
                <Tab
                  key={cat.id}
                  title={cat.name}
                  className="text-base px-2 pb-1"
                  classNames={{
                    tab:
                      activeCategory === cat.id
                        ? "border-blue-500 text-white font-semibold"
                        : "border-transparent text-gray-400",
                  }}
                />
              ))}
            </Tabs>
          </div>

          {/* Cards de recursos */}
          <div className="flex flex-col gap-8">
            {filteredResources.length === 0 && (
              <div className="text-gray-400 text-center py-8">No resources found.</div>
            )}

            {activeCategory === "all"
              ? categories.map((cat) => {
                  const subcats = resourcesByCategory[cat.id];
                  if (!subcats || Object.keys(subcats).length === 0) return null;
                  return (
                    <div key={cat.id}>
                      <h2 className={subtitle({ class: "text-gray-400" })}>{cat.name}</h2>
                      {Object.entries(subcats).map(([subcatId, subcatData]) => (
                        <div key={subcatId} className="mb-4">
                          <h3 className="text-blue-400 text-base font-semibold mb-2">{subcatData.name}</h3>
                          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-4">
                            {subcatData.resources.map((res) => (
                              <Card
                                key={res.id}
                                isPressable
                                isHoverable
                                onPress={() => window.open(res.url, "_blank")}
                                className="bg-gray-900 rounded-xl shadow border border-gray-800 text-left md:min-w-80 md:flex-1 h-fit"
                              >

                                <CardBody>
                                  <div className="text-lg font-semibold text-white mb-1 ">{res.title}</div>
                                  <div className="text-gray-400">{res.description}</div>
                                </CardBody>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })
              : (() => {
                  const subcats = resourcesByCategory[activeCategory];
                  if (!subcats || Object.keys(subcats).length === 0) return null;
                  return Object.entries(subcats).map(([subcatId, subcatData]) => (
                    <div key={subcatId} className="mb-4">
                      <h3 className="text-blue-400 text-base font-semibold mb-2">{subcatData.name}</h3>
                      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-4">
                        {subcatData.resources.map((res) => (
                          <Card
                            key={res.id}
                            isPressable
                            isHoverable
                            onPress={() => window.open(res.url, "_blank")}
                            className="bg-gray-900 rounded-xl shadow border border-gray-800 text-left md:min-w-80 md:flex-1 h-fit"
                          >
                            <CardBody>
                              <div className="text-lg font-semibold text-white mb-1">{res.title}</div>
                              <div className="text-gray-400">{res.description}</div>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
