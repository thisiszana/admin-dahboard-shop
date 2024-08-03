import { getServerSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }) {
  const session = getServerSession();

  if (session) redirect("/dashboard");
  return <main>{children}</main>;
}
