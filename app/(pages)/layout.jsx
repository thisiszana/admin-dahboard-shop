import { redirect } from "next/navigation";

import Sidebar from "@/components/shared/layout/Sidebar";
import Navbar from "@/components/shared/layout/Navbar";

import { getServerSession } from "@/utils/session";
import { getCurrentAdmin } from "@/actions/admin.action";

export default async function PagesLayout({ children }) {
  const session = getServerSession();

  if (!session) redirect("/login");

  const data = await getCurrentAdmin();

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="pages_spaces">
        {data.currentAdmin.roll === "USER" ? (
          "not allowed"
        ) : (
          <div className="space-y-[20px]">
            <div>{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}
