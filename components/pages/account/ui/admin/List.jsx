import { adminsDataSourse } from "@/constant/tableDataSourse";
import { adminsColumns } from "@/constant/tableColumns";
import { getServerSession } from "@/utils/session";
import { Table } from "antd";

export default function List({ data }) {
  const session = getServerSession();

  return (
    <div className="tableContainer">
      <Table
        columns={adminsColumns}
        dataSource={adminsDataSourse(data, session.userId, session.roll)}
        pagination={false}
        scroll={{ x: true }}
      />
    </div>
  );
}
