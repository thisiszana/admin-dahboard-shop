"use client";

import CustomBadge from "@/components/shared/CustomBadge";
import { Table } from "antd";

const columns = [
  {
    title: "Invoice ID",
    dataIndex: "invoiceID",
    key: "invoiceID",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const dataSourse = [
  {
    key: 1,
    invoiceID: "INV-1990",
    category: "Android",
    price: "$83.74",
    status: <CustomBadge title="Paid" condition={true} />,
  },
  {
    key: 2,
    invoiceID: "INV-1991",
    category: "Mac",
    price: "$97.14",
    status: (
      <CustomBadge title="Out of date" colors="text-darkRose bg-lightRose" />
    ),
  },
  {
    key: 3,
    invoiceID: "INV-1992",
    category: "Windows",
    price: "$68.71",
    status: <CustomBadge title="Progress" condition={false} />,
  },
  {
    key: 4,
    invoiceID: "INV-1993",
    category: "Android",
    price: "$85.21",
    status: <CustomBadge title="Paid" condition={true} />,
  },
  {
    key: 5,
    invoiceID: "INV-1994",
    category: "Mac",
    price: "$52.17",
    status: <CustomBadge title="Paid" condition={true} />,
  },
];

export default function NewInvoices() {
  return (
    <div className="tableContainer border-none max-xl:w-full xl:w-2/3 h-fit">
      <div className="p-6">
        <h1 className="h2">New Invoices</h1>
      </div>
      <Table
        columns={columns}
        dataSource={dataSourse}
        pagination={false}
        scroll={{ x: true }}
      />
    </div>
  );
}
