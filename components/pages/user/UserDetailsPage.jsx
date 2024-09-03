import { notFound } from "next/navigation";

import { getUser } from "@/services/queries";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { userPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import { shorterText } from "@/utils/fun";
import { Empty } from "antd";
import User from "./ui/User";

export default async function UserDetailsPage({ id }) {
  const data = await getUser(id);

  if (!data.user) {
    notFound();
  }
  return (
    <>
      <PageHeading title={`User #${shorterText(id, 8)}`} />
      <CustomBreadcrumb items={userPageBread} />
      {!data.user.user ? (
        <div className="box border">
          <Empty description="No User!" />
        </div>
      ) : (
        <User user={data.user.user} />
      )}
    </>
  );
}
