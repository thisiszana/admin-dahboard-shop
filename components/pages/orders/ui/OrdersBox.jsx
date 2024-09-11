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
    staleTime: 0,
    refetchInterval: 50 * 1000,
  });
  console.log("usequery data:", data, isLoading);
  return (
    <>
      {isLoading ? (
        <LoaderBar />
      ) : (
        <OrdersTable orders={data?.combinedDetails} />
      )}
    </>
  );
}
