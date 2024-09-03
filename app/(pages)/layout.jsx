import { redirect } from "next/navigation";

import Sidebar from "@/components/shared/layout/Sidebar";
import Navbar from "@/components/shared/layout/Navbar";

import NotAllowed from "@/components/shared/NotAllowed";
import { getCurrentAdmin } from "@/actions/admin.action";
import { getServerSession } from "@/utils/session";

export default async function PagesLayout({ children }) {
  const session = getServerSession();

  if (!session) redirect("/register");

  const data = await getCurrentAdmin();

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="pages_spaces">
        {data?.currentAdmin?.roll === "USER" ? (
          <NotAllowed />
        ) : (
          <div className="space-y-[20px]">
            <div>{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}
