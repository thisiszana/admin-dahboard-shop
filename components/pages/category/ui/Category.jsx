import CategoryActions from "../../categories/ui/CategoryActions";
import CategoryInformation from "./CategoryInformation";

export default function Category({ category }) {
  return (
    <div className="flex flex-col gap-box">
      <CategoryActions id={category?._id} />
      <CategoryInformation info={category} />
    </div>
  );
}
