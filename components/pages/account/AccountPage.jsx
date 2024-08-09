import { Suspense } from "react";

import { Tabs } from "antd";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { accountPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import LoaderBar from "@/components/shared/LoaderBar";
import { Settings } from "@/components/icons/Icon";
import GeneralTab from "./ui/general/GeneralTab";

export default function AccountPage() {
  const items = [
    {
      key: "general",
      label: (
        <div className="flex items-center gap-2">
          <Settings size={15} />
          <p className="text-h4">General</p>
        </div>
      ),
      children: (
        <Suspense fallback={<LoaderBar />}>
          <GeneralTab />
         </Suspense>
      ),
    },
  ];
  return (
    <>
      <PageHeading title="Account Setting" />
      <CustomBreadcrumb items={accountPageBread} />
      <Tabs defaultActiveKey="general" items={items} />
    </>
  );
}
