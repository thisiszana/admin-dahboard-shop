"use client"

import { Empty } from "antd";

export default function UserOrders({orders}) {
  if (orders.length === 0) {
    return (
      <div className="box w-full">
        <Empty description="No Orders!" />
      </div>
    );
  }
  return (
    <div>UserOrders</div>
  )
}
