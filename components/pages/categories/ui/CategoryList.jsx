"use client"

import { categoryColumn } from "@/constant/tableColumns"
import { categoryDataSourse } from "@/constant/tableDataSourse"
import { Table } from "antd"

export default function CategoryList({category}) {
  console.log(category)
  return (
    <div>
      <Table
        scroll={{ x: true }}
        pagination={false}
        columns={categoryColumn}
        dataSource={categoryDataSourse(category)}
      />
    </div>
  )
}
