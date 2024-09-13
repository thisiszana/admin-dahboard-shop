"use client";

import LoaderBar from "@/components/shared/LoaderBar";
import { getComments } from "@/services/queries";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/services/queryKey";
import { Empty, Table } from "antd";
import { commentsColumns, userCommentsColumns } from "@/constant/tableColumns";
import { commentsDataSourse } from "@/constant/tableDataSourse";

export default function CommentsList() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.comments],
    queryFn: getComments,
    gcTime: 50 * 1000,
    staleTime: 0,
    // refetchInterval: 50 * 1000,
  });
  console.log("client comments", data);

  if (isLoading) {
    return <LoaderBar />;
  }

  return (
    <div className="tableContainer">
      {data.combinedData.length === 0 && <Empty description="No Comments!" />}
      {data.combinedData.length !== 0 && (
        <Table
          columns={commentsColumns}
          dataSource={commentsDataSourse(
            JSON.parse(JSON.stringify(data.combinedData))
          )}
          pagination={false}
          scroll={{ x: true }}
        />
      )}
    </div>
  );
}
