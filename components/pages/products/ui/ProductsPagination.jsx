"use client";

import { LeftAngle, RightAngle } from "@/components/icons/Icon";
import useSetSearchParams from "@/hooks/setSearchQuery";

export default function ProductsPagination({
  totalPages,
  totalProducts,
  searchParams,
}) {
  const { setSearchParams } = useSetSearchParams();
  const currentPage = Number(searchParams?.page) || 1;

  const nextPage = () => {
    const newPage = currentPage + 1;
    setSearchParams("page", String(newPage));
  };

  const prevPage = () => {
    const newPage = currentPage - 1;
    setSearchParams("page", String(newPage));
  };

  return (
    <div className="flex items-center justify-end gap-2 p-4">
      <p className="whitespace-nowrap text-p2 bg-dark1 text-white rounded-btn py-1 px-3">
        {totalProducts} Products
      </p>
      <div className="flex items-center gap-2 w-full justify-end">
        <p className="rounded-xl text-sm">
          {searchParams.page || 1} / {totalPages || 1}
        </p>
        <button
          type="button"
          onClick={() => prevPage()}
          disabled={
            searchParams?.page == "1" || searchParams?.page === undefined
          }
          className={`${
            searchParams?.page == "1" || searchParams?.page === undefined
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          } rounded-full hover:bg-lightGray p-3 Transition`}
        >
          <LeftAngle size={15} />
        </button>
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={
            searchParams?.page == String(totalPages) ||
            totalPages === 1 ||
            totalPages === 0
          }
          className={`${
            searchParams?.page == String(totalPages) ||
            totalPages === 1 ||
            totalPages === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          } rounded-full hover:bg-lightGray p-3 Transition`}
        >
          <RightAngle size={15} />
        </button>
      </div>
    </div>
  );
}
