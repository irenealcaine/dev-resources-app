import { categories, subcategories, resources } from "../data/examples"
import { title, subtitle } from "../components/primitives";
import DefaultLayout from "../layouts/default";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "violet" })}>Dev resources</h1>

          {categories.map((category) => (
            <div key={category.id}>
              <h2 className={subtitle({ color: "violet" })}>
                {category.icon} {category.name}
              </h2>
              <ul>
                {subcategories
                  .filter((sub) => sub.categoryId === category.id)
                  .map((sub) => (
                    <>
                      <div key={sub.id} className="text-default-600">
                        {sub.name}
                      </div>
                      <div>
                        {
                          resources.filter((res) => res.subcategoryId === sub.id).map((res) => (

                            <Card key={res.id} className="max-w-[400px]">
                              <CardHeader className="flex gap-3">
                                <p className="text-md">{res.title}</p>
                              </CardHeader>
                              <Divider />
                              <CardBody>
                                <p>{res.description}</p>
                              </CardBody>
                              <Divider />
                              <CardFooter>
                                <Link isExternal showAnchorIcon href={res.url}>
                                  Link
                                </Link>
                              </CardFooter>
                            </Card>
                          ))
                        }</div>
                    </>
                  ))}
              </ul>
            </div>
          ))}
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>



      </section>
    </DefaultLayout>
  );
}
