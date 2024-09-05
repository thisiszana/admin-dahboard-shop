import { usersDataSourse } from "@/constant/tableDataSourse";
import { usersColumns } from "@/constant/tableColumns";
import { getUsers } from "@/services/queries";

import { Table } from "antd";

export default async function UsersList() {
  const data = await getUsers();

  return (
    <div className="tableContainer">
      <Table
        pagination={false}
        scroll={{ x: true }}
        columns={usersColumns}
        dataSource={usersDataSourse(
          data?.users?.users
        )}
      />
    </div>
  );
}
