import NextImage from "next/image";
import Link from "next/link";

import { images } from ".";

import { Image } from "@nextui-org/image";
import moment from "moment";
import { shorterText } from "@/utils/fun";
import CustomBadge from "@/components/shared/CustomBadge";
import ProductActions from "@/components/pages/products/ui/ProductActions";
import AdminActions from "@/components/pages/account/ui/admin/AdminActions";

export const productsDataSourse = (products) =>
  products.map((product) => ({
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
    orders: (product.orders && product.orders.length) || "_",
    comments: (product.comments && product.comments.length) || "_",
    // likes: (product.likes && product.likes.length) || "_",
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
    actions: (
      <ProductActions productId={product._id} published={product.published} />
    ),
  }));

export const adminsDataSourse = (admins, currentUserID, currentUserRoll) =>
  admins.map((admin) => ({
    key: admin._id,
    avatar: (
      <div className="w-12 h-12">
        <Image
          as={NextImage}
          src={admin.image || images.admin}
          width={100}
          height={100}
          style={{ width: "500px", height: "auto" }}
          alt="admin"
          radius="full"
        />
      </div>
    ),
    name: (
      <div>
        <p className="text-p1 font-medium">
          {admin.username}{" "}
          {currentUserID === admin._id && (
            <span className="bg-lightBlue text-darkBlue rounded-btn py-.5 px-2 text-p2 font-medium border border-darkBlue">
              YOU
            </span>
          )}
        </p>
        {admin.firstName && (
          <p className="text-p2 text-darkGray">{admin.firstName}</p>
        )}
      </div>
    ),
    phone: admin.phoneNumber || "_",
    roll: (
      <CustomBadge
        condition={admin.roll === "OWNER" || admin.roll === "ADMIN"}
        title={admin.roll}
      />
    ),
    date: (
      <div>
        <p>{moment(admin.createdAt).format("L")}</p>
        <p className="text-p2 text-darkGray">
          {moment(admin.createdAt).format("LT")}
        </p>
      </div>
    ),
    action: (
      <AdminActions
        roll={admin.roll}
        userId={admin._id}
        showMore={currentUserRoll === "OWNER" && admin.roll !== "OWNER"}
      />
    ),
  }));

export const usersDataSourse = (users) =>
  users?.map((user) => ({
    key: user._id,
    name: (
      <Link href={`/users/${user._id}`} className="flex items-center gap-3">
        <Image
          as={NextImage}
          src={user.image || images.person}
          width={40}
          height={40}
          alt="user"
        />
        <div>
          <p className="text-p1 font-medium">{user.username}</p>
          {user.displayName && (
            <p className="text-p2 text-darkGray">{user.displayName}</p>
          )}
        </div>
      </Link>
    ),
    phoneNumber: user.phoneNumber || "_",
    address: user.address || "_",
    orders:
      user.orders.length === 0 ? "_" : user.orders.length.toLocaleString(),
    comments:
      user.comments.length === 0 ? "_" : user.comments.length.toLocaleString(),
    // likes: user.likes.length === 0 ? "_" : user.likes.length.toLocaleString(),
    cartStatus: (
      <CustomBadge
        condition={user.cart.totalProductsCount !== 0}
        title={user.cart.totalProductsCount === 0 ? "Empty" : "Fill"}
      />
    ),
    date: moment(user.createdAt).format("L"),
  }));
