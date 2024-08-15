"use client"

import { productsDataSourse } from "@/constant/tableDataSourse"
import { productsColumn } from "@/constant/tableColumns"
import { Table } from "antd"

export default function ProductsList({ products }) {

  return (
    <div>
      <Table
        scroll={{ x: true }}
        pagination={false}
        columns={productsColumn}
        dataSource={productsDataSourse(products)}
      />
    </div>
  )
}
