"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

import { CircleClose, Trash } from "@/components/icons/Icon";
import CustomInp from "@/components/shared/form/CustomInp";
import useSetSearchParams from "@/hooks/setSearchQuery";
import { Select, SelectItem } from "@nextui-org/react";
import CustomBtn from "@/components/shared/CustomBtn";
import { categories } from "@/constant";

const ProductsFilter = () => {
  const router = useRouter();
  const { searchParams, setSearchParams, params } = useSetSearchParams();
  const [filters, setFilters] = useState([]);

  const handleSearchQuery = useDebouncedCallback((query) => {
    setSearchParams("page", "1");
    setSearchParams("search", query);
  }, 300);

  useEffect(() => {
    let paramsArray;

    paramsArray = !!!params.toString()
      ? []
      : params
          .toString()
          .split("&")
          .map((param) => param.split("="));

    setFilters(
      paramsArray.length === 0
        ? []
        : paramsArray.filter((param) => param[0] !== "page")
    );
  }, [searchParams, params]);

  const clearFilters = () => {
    router.replace("/products");
    router.refresh("/products");
  };

  const deleteFilter = (queryName) => {
    setSearchParams(queryName, "");
  };

  const selectFilters = [
    {
      label: "Category",
      items: categories.map((c) => ({ key: c.query, label: c.title })),
      onChange: (e) => {
        setSearchParams("page", "1");
        setSearchParams("category", e.target.value.toLowerCase());
      },
    },
    {
      label: "Stock",
      items: [
        { key: "in-stock", label: "In Stock" },
        { key: "out-of-stock", label: "Out of Stock" },
      ],
      onChange: (e) => {
        setSearchParams("page", "1");
        setSearchParams("stock", e.target.value.toLowerCase());
      },
    },
    {
      label: "Published",
      items: [
        { key: "true", label: "Published" },
        { key: "false", label: "Draft" },
      ],
      onChange: (e) => {
        setSearchParams("page", "1");
        setSearchParams("published", e.target.value.toLowerCase());
      },
    },
    {
      label: "Discount",
      items: [
        { key: "has-discount", label: "Has Discount" },
        { key: "no-discount", label: "No Discount" },
      ],
      onChange: (e) => {
        setSearchParams("page", "1");
        setSearchParams("discount", e.target.value.toLowerCase());
      },
    },
  ];

  return (
    <div className="p-4 w-full">
      <div className="flex flex-wrap gap-4 w-full">
        <CustomInp
          type="text"
          label="Search"
          wrapperClassName="min-w-[200px] flex flex-1"
          defaultValue={
            !!searchParams.get("search")?.toString()
              ? searchParams.get("search")?.toString()
              : ""
          }
          onChange={(e) => {
            handleSearchQuery(e.target.value);
          }}
        />
        {selectFilters.map((select, index) => (
          <Select
            items={select.items}
            label={select.label}
            className="min-w-[200px] flex flex-1"
            onChange={select.onChange}
            key={index}
          >
            {(s) => <SelectItem>{s.label}</SelectItem>}
          </Select>
        ))}
      </div>
      {filters.length !== 0 && (
        <PageFilters
          filters={filters}
          clearFilters={clearFilters}
          deleteFilter={deleteFilter}
        />
      )}
    </div>
  );
};

export default ProductsFilter;

const PageFilters = ({ filters, clearFilters, deleteFilter }) => {
  return (
    <div className="flex gap-2 items-center flex-wrap mt-3">
      {filters.map((filter) => {
        return (
          <div
            key={filter[0]}
            className="flex items-center gap-2 p-2 rounded-btn border"
          >
            <span className="capitalize text-p2">{filter[0]}:</span>
            <CustomBtn
              type="button"
              classNames="rounded-btn flex items-center gap-btn bg-dark1 hover:bg-dark2 Transition py-[2.5px] px-1.5 group"
              title={
                <>
                  <span className="text-lightGray text-p2 capitalize">
                    {filter[1]}
                  </span>
                  <CircleClose
                    size={18}
                    className="text-darkGray group-hover:text-lightGray Transition"
                  />
                </>
              }
              onClick={() => deleteFilter(filter[0])}
            />
          </div>
        );
      })}
      <CustomBtn
        type="button"
        classNames="rounded-btn flex items-center gap-btn text-[#ff5630] hover:bg-lightOrange Transition p-2"
        title={<p className="text-p1 font-bold">Clear</p>}
        icon={<Trash />}
        onClick={clearFilters}
      />
    </div>
  );
};
