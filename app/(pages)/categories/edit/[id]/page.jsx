import AddCategoryPage from "@/components/pages/add-category/AddCategoryPage";
import CategorySorme from "@/models/CategorySorme";

export default async function EditCategory({ params: { id } }) {
  const category = await CategorySorme.findById(id);

  if (!category) return <h3>Category not found</h3>;
  return <AddCategoryPage data={JSON.parse(JSON.stringify(category))} />;
}
