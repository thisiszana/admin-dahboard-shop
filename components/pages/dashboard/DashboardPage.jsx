import UpcommingEvents from "./ui/UpcommingEvents";
import RevenueCompare from "./ui/RevenueCompare";
import TotoalRevenue from "./ui/TotoalRevenue";
import NewInvoices from "./ui/NewInvoices";
import Reviews from "./ui/Reviews";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Reviews />
      <div className="xl:flex xl:gap-5">
        <RevenueCompare />
        <TotoalRevenue />
      </div>
      <div className="xl:flex xl:gap-5">
        <NewInvoices />
        <UpcommingEvents />
      </div>
    </div>
  );
}
