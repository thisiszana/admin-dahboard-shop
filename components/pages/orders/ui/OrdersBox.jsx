"use client";

import OrdersTable from "./OrdersTable";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/services/queryKey";
import { getOrders } from "@/services/queries";
import LoaderBar from "@/components/shared/LoaderBar";

export default function OrdersBox() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.user_orders],
    queryFn: getOrders,
    gcTime: 0,
    staleTime: 5 * 1000,
    refetchInterval: 50 * 10000,
  });

  console.log("useQuery data:", data);

  if (isLoading) {
    return <LoaderBar />;
  }

  return (
    <>
      <OrdersTable orders={data?.combinedDetails} />
    </>
  );
}
