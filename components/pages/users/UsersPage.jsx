import { Suspense } from "react";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { userPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import LoaderBar from "@/components/shared/LoaderBar";
import UsersList from "./ui/UsersList";

export default function UsersPage() {
  return (
    <>
      <PageHeading title="Users" />
      <CustomBreadcrumb items={userPageBread} />
      <Suspense fallback={<LoaderBar />}>
        <UsersList />
      </Suspense>
    </>
  );
}
