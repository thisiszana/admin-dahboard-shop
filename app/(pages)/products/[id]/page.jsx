import ProductDetailsPage from "@/components/pages/product/ProductDetailsPage";

export default function Product({ params }) {
  return <ProductDetailsPage id={params.id} />;
}
