"use client";

import { useEffect, useState } from "react";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { addBlogPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import BlogForm from "@/components/shared/form/BlogForm";

export default function AddBlogPage({data}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    keywords: [],
    published: false,
  });

  useEffect(() => {
    if (data) setForm(data );
  }, [data]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <>
      <PageHeading title={`${data ? "Edit" : "Add New"} Blog`} />
      <CustomBreadcrumb items={addBlogPageBread} />
      <BlogForm
        type={`${data ? "edit" : "create"}`}
        form={form}
        setForm={setForm}
        onChange={onChange}
        id={data?._id}
      />
    </>
  );
}
