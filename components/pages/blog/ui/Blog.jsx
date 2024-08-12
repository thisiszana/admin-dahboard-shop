import { notFound } from "next/navigation";

import React from "react";

import { getBlog } from "@/actions/blog.action";
import BlogContent from "./BlogContent";
import BlogAction from "./BlogAction";

export default async function Blog({ id }) {
  const data = await getBlog(id);

  if (!data.blog) {
    notFound();
  }

  return (
    <div className="space-y-5">
      <BlogAction
        id={JSON.parse(JSON.stringify(data.blog._id))}
        isPublished={data.blog.published}
      />
      <BlogContent {...JSON.parse(JSON.stringify(data.blog))} />
    </div>
  );
}
