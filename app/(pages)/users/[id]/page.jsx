import UserDetailsPage from "@/components/pages/user/UserDetailsPage";

export default function page({ params }) {
  return <UserDetailsPage id={params.id} />;
}
