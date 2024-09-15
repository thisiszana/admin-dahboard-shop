import NextImage from "next/image";
import Link from "next/link";

import { images } from ".";

import { Image } from "@nextui-org/image";
import moment from "moment";
import { shorterText } from "@/utils/fun";
import CustomBadge from "@/components/shared/CustomBadge";
import ProductActions from "@/components/pages/products/ui/ProductActions";
import AdminActions from "@/components/pages/account/ui/admin/AdminActions";
import OrdersActions from "@/components/pages/orders/ui/OrdersActions";
import CommentAction from "@/components/pages/shared/CommentAction";
import CategoryActions from "@/components/pages/categories/ui/CategoryActions";

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

export const categoryDataSourse = (category) =>
  category.map((c) => ({
    key: c._id,
    name: (
      <Link
        href={`/categories/${c._id}`}
        className="flex items-center gap-2 w-fit"
      >
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <Image
            as={NextImage}
            src={c.image}
            width={100}
            height={100}
            alt="Category"
            priority
          />
        </div>

          <p>{shorterText(c.name, 15)}...</p>


      </Link>
    ),
    date: moment(c.createdAt).calendar(),
    status: (
      <CustomBadge
        condition={c.published}
        title={c.published ? "Published" : "Draft"}
      />
    ),
    creator: (
      <Link
        href={`/account/admins/${c.createdBy._id}`}
        className="flex items-center xl:flex-row gap-3"
      >
        <div className="w-10 h-10">
          <Image
            as={NextImage}
            src={c.createdBy.image || images.admin}
            width={200}
            height={200}
            style={{ width: "500px", height: "auto" }}
            alt="admin"
            className="rounded-full"
          />
        </div>
        <p className="text-p2 font-medium capitalize">
          {c.createdBy.firstName}
        </p>
      </Link>
    ),
    actions: (
      <CategoryActions productId={c._id} published={c.published} />
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

export const upcommingEventsDataSourse = (events) =>
  events.map((event) => ({
    key: event._id,
    date: moment(event.createdAt).format("MMM Do"),
    title: (
      <div className="space-y-1">
        <p>{event.title}</p>
        <p className="text-p2 bg-lightGray rounded-lg py-.5 px-2 border w-fit">
          {moment(event.dueDate).fromNow()}
        </p>
      </div>
    ),
    status: (
      <CustomBadge
        title={event.status}
        colors={
          event.status === "Todo"
            ? "text-darkBlue bg-lightBlue"
            : event.status === "Progress"
            ? "text-darkOrange bg-lightOrange"
            : "text-darkGreen bg-lightGreen"
        }
      />
    ),
  }));

export const ordersListDataSourse = (orders) =>
  orders.map((order) => ({
    key: order._id,
    _id: (
      <Link href={`/orders/${order._id}`}>#{shorterText(order._id, 10)}</Link>
    ),
    userId: (
      <Link href={`/users/${order.userId._id}`}>
        <div className="flex items-center gap-3">
          <Image
            as={NextImage}
            src={order.userId.image || images.person}
            width={35}
            height={35}
            alt={shorterText(order.userId.username, 8)}
          />
          <div>
            <p className="text-p1 font-medium line-clamp-3">
              {order.userId.username}
            </p>
            {order.userId.displayName && (
              <p className="text-p2 text-darkGray">
                {order.userId.displayName}
              </p>
            )}
          </div>
        </div>
      </Link>
    ),
    createdAt: moment(order.createdAt).format("L"),
    totalProducts: order.summary.totalProducts.toLocaleString(),
    totalPayable: `$${order.summary.totalPayable.toLocaleString()}`,
    status: (
      <CustomBadge
        condition={order.status === "Completed"}
        title={order.status}
      />
    ),
    actions: (
      <OrdersActions
        orderId={order._id}
        orderStatus={JSON.parse(JSON.stringify(order.status))}
      />
    ),
    expandedContent: order.products.map((p) => (
      <div
        key={p.product._id}
        className="bg-lightGray p-2 border flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px]">
            <Image
              as={NextImage}
              src={p.product.image}
              width={50}
              height={50}
              alt="product image"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <span className="line-clamp-2">{p.product.title}</span>
        </div>
        <div className="flex items-center justify-between gap-10">
          <p className="text-p1 font-medium">×{p.quantity}</p>
          {order.items.map((item) => (
            <p key={item._id}>${item.quantity * item.cost}</p>
          ))}
        </div>
      </div>
    )),
  }));

export const orderCheckoutSummaryDataSourse = (items) =>
  items.map((item) => ({
    key: item.productId._id,
    product: (
      <Image
        as={NextImage}
        src={item.productId.image}
        width={50}
        height={50}
        alt={shorterText(item.productId.title, 20)}
      />
    ),
    qty: item.quantity,
    unitPrice: `$${item.cost.toLocaleString()}`,
    amount: `$${(item.quantity * item.cost).toLocaleString()}`,
  }));

export const userCommentsDataSourse = (comments) =>
  comments.map((comment) => ({
    key: comment._id,
    product: (
      <Link href={`/products/${comment.productId}`}>
        #{shorterText(comment.productId, 8)}
      </Link>
    ),
    date: (
      <div>
        <p>{moment(comment.createdAt).format("L")}</p>
        <p className="text-p2 text-darkGray">
          {moment(comment.createdAt).format("LT")}
        </p>
      </div>
    ),
    title: <p className="text-p2">{shorterText(comment.title, 20)}</p>,
    isAnswered: (
      <CustomBadge
        condition={comment.status === "Answered"}
        title={comment.status}
      />
    ),
    status: (
      <CustomBadge
        condition={comment.published}
        title={comment.published ? "Published" : "Draft"}
      />
    ),
    actions: (
      <CommentAction
        _id={JSON.parse(JSON.stringify(comment._id))}
        answer={JSON.parse(JSON.stringify(comment.answer))}
        status={JSON.parse(JSON.stringify(comment.status))}
        published={JSON.parse(JSON.stringify(comment.published))}
        productId={JSON.parse(JSON.stringify(comment.productId))}
      />
    ),
  }));

export const userOrdersDataSourse = (orders) =>
  orders.map((order) => ({
    key: order._id,
    _id: (
      <Link href={`/orders/${order._id}`}>#{shorterText(order._id, 8)}</Link>
    ),
    date: (
      <div>
        <p>{moment(order.createdAt).format("L")}</p>
        <p className="text-p2 text-darkGray">
          {moment(order.createdAt).format("LT")}
        </p>
      </div>
    ),
    totalProducts: order.summary.totalProducts,
    totalPayable: `$${order.summary.totalPayable.toLocaleString()}`,
    status: (
      <CustomBadge
        condition={order.status === "Completed"}
        title={order.status}
      />
    ),
  }));

export const commentsDataSourse = (comments) =>
  comments.map((comment) => ({
    key: comment.comment._id,
    id: `#${shorterText(comment.comment._id, 10)}`,
    user: (
      <Link
        href={`/users/${comment.comment.senderId?._id}`}
        className="flex items-center gap-3"
      >
        <Image
          as={NextImage}
          src={comment.comment.senderId.image || images.person}
          width={40}
          height={40}
          alt="user"
        />
        <div>
          <p className="text-p1 font-medium">
            {comment.comment.senderId.username}
          </p>
          {comment.comment.senderId.displayName && (
            <p className="text-p2 text-darkGray">
              {comment.comment.senderId.displayName}
            </p>
          )}
        </div>
      </Link>
    ),
    status: (
      <CustomBadge
        condition={comment.comment.published}
        title={comment.comment.published ? "Published" : "Draft"}
      />
    ),
    isAnswered: (
      <CustomBadge
        condition={comment.comment.status === "Answered"}
        title={comment.comment.status}
      />
    ),
    date: moment(comment.comment.createdAt).fromNow(),
    action: (
      <CommentAction
        _id={JSON.parse(JSON.stringify(comment.comment._id))}
        answer={JSON.parse(JSON.stringify(comment.comment.answer))}
        status={JSON.parse(JSON.stringify(comment.comment.status))}
        published={JSON.parse(JSON.stringify(comment.comment.published))}
        productId={JSON.parse(JSON.stringify(comment.comment.productId))}
      />
    ),
  }));
