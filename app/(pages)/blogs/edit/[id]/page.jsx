import AddBlogPage from "@/components/pages/add-blog/AddBlogPage";
import { BlogSorme } from "@/models/blog";
import connectDB from "@/utils/connectDB";

export default async function EditBlog({ params: { id } }) {
  await connectDB();

  const blog = await BlogSorme.findById(id).lean();

  if (!blog) return <h3>Blog not found</h3>;
  return <AddBlogPage data={JSON.parse(JSON.stringify(blog))} />;
}
