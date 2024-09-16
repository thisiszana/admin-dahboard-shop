import ActiveTab from "./ActiveTab";
import ProductActions from "./ProductActions";
import ProductInformation from "./ProductInformation";

export default function Product({ product }) {

  return (
    <div className="flex flex-col gap-box">
      <ProductActions id={product?._id} />
      <ProductInformation info={product} />
      <ActiveTab
        comments={product?.comments}
        orders={product?.orders}
        // likes={product?.likes}
        productId={product._id}
      />
    </div>
  );
}
