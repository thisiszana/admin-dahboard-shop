"use client";

import { getUser } from "@/services/queries";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { userPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import { shorterText } from "@/utils/fun";
import { Empty } from "antd";
import User from "./ui/User";
import CustomLink from "@/components/shared/CustomLink";
import { LeftAngle } from "@/components/icons/Icon";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/services/queryKey";
import LoaderBar from "@/components/shared/LoaderBar";

export default function UserDetailsPage({ id }) {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.user, id],
    queryFn: () => getUser(id),
    gcTime: 0,
    staleTime: 0,
    refetchInterval: 50 * 1000,
  });

  if (isLoading) {
    return <LoaderBar />;
  }

  console.log("user details page data",data);

  return (
    <>
      <div className="flex gap-2 items-center">
        <CustomLink
          icon={<LeftAngle size={13} className="text-darkGray" />}
          href="/users"
          className="backLink w-fit mb-2"
        />
        <PageHeading title={`User #${shorterText(id, 8)}`} />
      </div>
      <CustomBreadcrumb items={userPageBread} />
      {!data.user.data ? (
        <div className="box border">
          <Empty description="No User!" />
        </div>
      ) : (
        <User user={data.user.data} />
      )}
    </>
  );
}
