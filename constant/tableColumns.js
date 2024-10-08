import { Table } from "antd";

export const productsColumn = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Creator",
    dataIndex: "creator",
    key: "creator",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Orders",
    dataIndex: "orders",
    key: "orders",
  },
  {
    title: "Comments",
    dataIndex: "comments",
    key: "comments",
  },
  {
    title: "Likes",
    dataIndex: "likes",
    key: "likes",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

export const productOrdersColumns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Quantity",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
  },
];

export const categoryColumn = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Creator",
    dataIndex: "creator",
    key: "creator",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

export const adminsColumns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Role",
    dataIndex: "roll",
    key: "roll",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

export const usersColumns = [
  {
    key: "name",
    dataIndex: "name",
    title: "Name",
  },
  {
    key: "phoneNumber",
    dataIndex: "phoneNumber",
    title: "Phone Number",
  },
  {
    key: "address",
    dataIndex: "address",
    title: "Address",
  },
  {
    key: "orders",
    dataIndex: "orders",
    title: "Orders",
  },
  {
    key: "comments",
    dataIndex: "comments",
    title: "Comments",
  },
  {
    key: "likes",
    dataIndex: "likes",
    title: "Likes",
  },
  {
    key: "cartStatus",
    dataIndex: "cartStatus",
    title: "Cart Status",
  },
  {
    key: "date",
    dataIndex: "date",
    title: "Joined At",
  },
];

export const upcommingEventsCollumns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

export const ordersColumns = [
  {
    title: "Id",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "User",
    dataIndex: "userId",
    key: "userId",
    responsive: ["lg"],
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Items",
    dataIndex: "totalProducts",
    key: "totalProducts",
  },
  {
    title: "Price",
    dataIndex: "totalPayable",
    key: "totalPayable",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  Table.EXPAND_COLUMN,
  {
    dataIndex: "actions",
    key: "actions",
  },
];

export const orderPageCheckoutTableColumns = [
  {
    key: "product",
    title: "Product",
    dataIndex: "product",
  },
  {
    key: "qty",
    title: "Qty",
    dataIndex: "qty",
  },
  {
    key: "unitPrice",
    title: "Unit Price",
    dataIndex: "unitPrice",
  },
  {
    key: "amount",
    title: "Amount",
    dataIndex: "amount",
  },
];

export const userCommentsColumns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "IsAnswered",
    dataIndex: "isAnswered",
    key: "isAnswered",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

export const userOrdersColumns = [
  {
    title: "Id",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Items",
    dataIndex: "totalProducts",
    key: "totalProducts",
  },
  {
    title: "Price",
    dataIndex: "totalPayable",
    key: "totalPayable",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

export const commentsColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "user",
    dataIndex: "user",
    title: "User",
    responsive: ["lg"],
  },
  {
    key: "status",
    dataIndex: "status",
    title: "Status",
  },
  {
    key: "isAnswered",
    dataIndex: "isAnswered",
    title: "Is Answered",
  },
  {
    key: "date",
    dataIndex: "date",
    title: "Date",
  },
  {
    key: "action",
    dataIndex: "action",
    title: "Action",
  },
];
