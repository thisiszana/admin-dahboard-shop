"use client";

import { featchSession } from "@/services/queries";

import { useQuery } from "@tanstack/react-query";

const useSession = () => {
  const { data, isLoading, isError, Error } = useQuery({
    queryKey: ["session"],
    queryFn: featchSession,
    retry: 1,
    staleTime: 1 * 60 * 60,
    gcTime: 1 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    Error,
  };
};

export default useSession;
