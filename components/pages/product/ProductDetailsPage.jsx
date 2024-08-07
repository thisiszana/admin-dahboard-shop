import { getProduct } from "@/actions/product.action";
import Product from "./ui/Product";

export default async function ProductDetailsPage({ id }) {
  const data = await getProduct(id);

  return <Product product={data.product} />;
}
