import { notFound } from "next/navigation";

import { getProduct } from "@/actions/product.action";
import Product from "./ui/Product";

export default async function ProductDetailsPage({ id }) {
  const data = await getProduct(id);

  if (!data.product) {
    notFound();
  }

  return <Product product={JSON.parse(JSON.stringify(data.product))} />;
}
