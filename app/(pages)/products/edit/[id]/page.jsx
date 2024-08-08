import AddProductPage from "@/components/pages/add-product/AddProductPage";

import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";

export default async function Edit({ params: { id } }) {
  await connectDB();
  const product = await ProductAdminSorme.findById(id);

  if (!product) return <h3>Product not found</h3>;

  return <AddProductPage data={JSON.parse(JSON.stringify(product))} />;
}
