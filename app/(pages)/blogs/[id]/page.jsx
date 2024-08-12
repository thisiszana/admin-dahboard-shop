import BlogDetailsPage from "@/components/pages/blog/BlogDetailsPage";

export default function page({ params }) {
  return <BlogDetailsPage id={params.id} />;
}
