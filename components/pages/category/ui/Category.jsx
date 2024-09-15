import CategoryInformation from "./CategoryInformation";
import CategoryAcyion from "./CategoryAcyion";

export default function Category({ category }) {
  return (
    <div className="flex flex-col gap-box">
      <CategoryAcyion id={category?._id} />
      <CategoryInformation info={category} />
    </div>
  );
}
