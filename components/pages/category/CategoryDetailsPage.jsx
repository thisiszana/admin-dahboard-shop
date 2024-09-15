import { getCategory } from "@/actions/category.action";
import Category from "./ui/Category";

export default async function CategoryDetailsPage({ id }) {
  const data = await getCategory(id);
  return <Category category={data.category} />;
}
