import { getProducts } from "@/actions/product.action";

import ProductsList from "./ProductsList";
import ProductsPagination from "./ProductsPagination";

export default async function ProductsOverview({ searchParams }) {
  const data = await getProducts(searchParams);

  if (data.code !== 200) {
    return <p>Error!</p>;
  }
  return (
    <>
      <ProductsList
        products={JSON.parse(JSON.stringify(data.products))}
      />
      <ProductsPagination
        totalProducts={data.totalProducts}
        totalProductsWithoutFilter={data.totalProductsWithoutFilter}
        totalPages={data.totalPages}
        searchParams={searchParams}
      />
    </>
  );
}
