import { getBlogs } from "@/actions/blog.action";
import BlogCard from "./BlogCard";

export default async function BlogsList() {
  const data = await getBlogs();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data.blogs.map((blog) => (
        <BlogCard key={blog._id} {...blog} />
      ))}
    </div>
  );
}
