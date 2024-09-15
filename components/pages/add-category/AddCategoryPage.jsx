"use client";

import { useState } from "react";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { addCategoryPageBread } from "@/constant/breadcrumpItems";
import CategoryForm from "@/components/shared/form/CategoryForm";
import PageHeading from "@/components/shared/PageHeading";

export default function AddCategoryPage({ data }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    published: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <>
      <PageHeading title={`${data ? "Edit" : "Add New"} Category`} />
      <CustomBreadcrumb items={addCategoryPageBread} />
      <CategoryForm
        type={`${data ? "EDIT" : "CREATE"}`}
        form={form}
        setForm={setForm}
        onChange={onChange}
        id={data?._id}
      />
    </>
  );
}
