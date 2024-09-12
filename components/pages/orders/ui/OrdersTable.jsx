"use client"

import { ordersColumns } from "@/constant/tableColumns"
import { ordersListDataSourse } from "@/constant/tableDataSourse"
import { Table } from "antd"

export default function OrdersTable({ orders }) {
  return (
    <div className="tableContainer">
      <Table
        columns={ordersColumns}
        dataSource={ordersListDataSourse(orders)}
        scroll={{ x: true }}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => <p>{record.expandedContent}</p>,
        }}
      />
    </div>
  )
}
