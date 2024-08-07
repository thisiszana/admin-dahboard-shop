import NextImage from "next/image";
import Link from "next/link";

import { images } from ".";

import { Image } from "@nextui-org/image";
import moment from "moment";
import { shorterText } from "@/utils/fun";
import CustomBadge from "@/components/shared/CustomBadge";

export const productsDataSourse = (products) => {
  return products.map((product) => ({
    key: product._id,
    name: (
      <Link
        href={`/products/${product._id}`}
        className="flex items-center gap-2 w-fit"
      >
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <Image
            as={NextImage}
            src={product.image}
            width={100}
            height={100}
            alt="product"
            priority
          />
        </div>
        <div>
          <p>{shorterText(product.title, 15)}...</p>
          <p>In {product.category}</p>
        </div>
      </Link>
    ),
    stock: (
      <p
        className={`w-fit ${
          product.stock === 0 &&
          "text-darkRose px-2 rounded-xl bg-lightRose font-bold text-xs"
        }`}
      >
        {product.stock === 0 ? "None!" : product.stock.toLocaleString()}
      </p>
    ),
    price: `$${product.price.toLocaleString()}`,
    discount: product.discount || "_",
    // orders: product.orders.length || "_",
    // comments: product.comments.length || "_",
    // likes: product.likes.length || "_",
    date: moment(product.createdAt).calendar(),
    status: (
      <CustomBadge
        condition={product.published}
        title={product.published ? "Published" : "Draft"}
      />
    ),
    creator: (
      <Link
        href={`/account/admins/${product.createdBy._id}`}
        className="flex items-center xl:flex-row gap-3"
      >
        <div className="w-10 h-10">
          <Image
            as={NextImage}
            src={product.createdBy.image || images.admin}
            width={200}
            height={200}
            style={{ width: "500px", height: "auto" }}
            alt="admin"
            className="rounded-full"
          />
        </div>
        <p className="text-p2 font-medium capitalize">
          {product.createdBy.firstName}
        </p>
      </Link>
    ),
  }));
};
