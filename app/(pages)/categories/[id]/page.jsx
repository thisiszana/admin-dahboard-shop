import CategoryDetailsPage from "@/components/pages/category/CategoryDetailsPage";

export default function CategoryDetails({ params }) {
  return <CategoryDetailsPage id={params.id} />;
}
