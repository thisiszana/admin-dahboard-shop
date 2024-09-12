"use client"

import { userOrdersColumns } from "@/constant/tableColumns";
import { userOrdersDataSourse } from "@/constant/tableDataSourse";
import { Empty, Table } from "antd";

export default function UserOrders({orders}) {
  if (orders.length === 0) {
    return (
      <div className="box w-full">
        <Empty description="No Orders!" />
      </div>
    );
  }

  console.log(orders)
  return (
    <div className="w-full tableContainer border-none">
      <Table
        columns={userOrdersColumns}
        pagination={false}
        scroll={{ x: true }}
        dataSource={userOrdersDataSourse(orders)}
      />
    </div>
  )
}
