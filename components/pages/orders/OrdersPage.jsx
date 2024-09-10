import { Suspense } from "react";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { ordersPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import LoaderBar from "@/components/shared/LoaderBar";
import OrdersBox from "./ui/OrdersBox";

export default function OrdersPage() {
  return (
    <>
      <PageHeading title="Orders List" />
      <CustomBreadcrumb items={ordersPageBread} />
      <Suspense fallback={<LoaderBar />}>
        <OrdersBox />
      </Suspense>
    </>
  );
}
