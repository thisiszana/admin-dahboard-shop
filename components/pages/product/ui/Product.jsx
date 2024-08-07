import ProductActions from "./ProductActions";
import ProductInformation from "./ProductInformation";

export default function Product({ product }) {
  return (
    <div className="flex flex-col gap-box">
      <ProductActions id={product?._id} />
      <ProductInformation info={product} />
    </div>
  );
}
