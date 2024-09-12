"use client";

import { userCommentsColumns } from "@/constant/tableColumns";
import { userCommentsDataSourse } from "@/constant/tableDataSourse";

import { Empty, Table } from "antd";

export default function UserComments({ comments }) {
  if (comments.length === 0) {
    return (
      <div className="box w-full">
        <Empty description="No Comments!" />
      </div>
    );
  }
  return (
    <div className="w-full tableContainer border-none">
      <Table
        columns={userCommentsColumns}
        dataSource={userCommentsDataSourse(comments)}
        pagination={false}
        scroll={{ x: true }}
      />
    </div>
  );
}
