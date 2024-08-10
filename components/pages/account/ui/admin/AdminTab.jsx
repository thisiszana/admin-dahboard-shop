import { getAdmins } from "@/actions/admin.action";

import List from "./List";

export default async function AdminTab() {
  const data = await getAdmins();

  return <List data={JSON.parse(JSON.stringify(data.admins))} />;
}
