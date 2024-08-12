"use client";

import { useState } from "react";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { addBlogPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import BlogForm from "@/components/shared/form/BlogForm";

export default function AddBlogPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    keywords: [],
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
      <PageHeading title="Create New Blog" />
      <CustomBreadcrumb items={addBlogPageBread} />
      <BlogForm
        type="create"
        form={form}
        setForm={setForm}
        onChange={onChange}
      />
    </>
  );
}
