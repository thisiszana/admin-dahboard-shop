// next
import Image from "next/image";
import Link from "next/link";

import { shorterText } from "@/utils/fun";

const BlogsResult = ({ blogs, closeModal }) => {
  return (
    <div>
      <h1 className="text-h3 font-medium mb-2">Blogs</h1>
      {blogs.map((blog) => (
        <Link
          href={`/blogs/${blog._id}`}
          key={blog._id}
          className="flex items-center gap-3 justify-between hoverable rounded-btn py-2 px-3"
          onClick={closeModal}
        >
          <div className="flex items-center gap-4">
            <Image
              src={blog.image}
              width={100}
              height={100}
              alt="blog"
              radius="sm"
              className="w-[50px]"
            />
            <p className="text-p1 font-medium line-clamp-4">
              {shorterText(blog.title, 30)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogsResult;
