import Image from "next/image";
import Link from "next/link";

import { shorterText } from "@/utils/fun";

const ProductsResult = ({ products, closeModal }) => {
  console.log(products)
  return (
    <div>
      <h1 className="text-h3 font-medium mb-2">Products</h1>
      {products.map((product) => (
        <Link
          href={`/products/${product._id}`}
          key={product._id}
          className="flex items-center gap-3 justify-between hoverable rounded-btn py-2 px-3"
          onClick={closeModal}
        >
          <div className="flex items-center gap-4">
            <Image
              src={product.image}
              width={100}
              height={100}
              alt="product"
              radius="none"
              className="w-[50px] h-[50px]"
            />
            <div>
              <p className="text-p1 font-medium line-clamp-4">
                {shorterText(product.title, 30)}
              </p>
              <p className="text-p2 text-darkGray">
                ${product.price.toLocaleString()} / Stock:{" "}
                {product.stock.toLocaleString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsResult;
