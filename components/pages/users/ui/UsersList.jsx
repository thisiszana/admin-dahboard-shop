"use client";

import { usersDataSourse } from "@/constant/tableDataSourse";
import { usersColumns } from "@/constant/tableColumns";
import { getUsers } from "@/services/queries";

import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/services/queryKey";

export default function UsersList() {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.users],
    queryFn: getUsers,
    gcTime: 0,
    staleTime: 0,
    refetchInterval: 50 * 1000,
  });

  console.log("users data", data)

  return (
    <div className="tableContainer">
      <Table
        pagination={false}
        scroll={{ x: true }}
        columns={usersColumns}
        dataSource={usersDataSourse(data?.users?.users)}
      />
    </div>
  );
}
