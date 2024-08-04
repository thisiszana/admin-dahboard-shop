import MobileNavbar from "./MobileNavbar";
import SignoutBtn from "../SignoutBtn";
import NavbarSearchBox from "../search/NavbarSearchBox";
import NotifcationBox from "../notifcation/NotifcationBox";
import ShowProfile from "./ShowProfile";

export default function Navbar() {
  return (
    <header className="backdrop-blur-xl bg-white/70 max-md:border-b border-b fixed z-20 left-0 top-0 right-0 p-4 pl-[280px] lg:pl-[270px] max-md:pl-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <SignoutBtn style="p-2 hover:bg-gray-100 rounded-full Transition text-darkGray text-[22px] flex items-center gap-btn" />
          <NavbarSearchBox />
          <NotifcationBox />
          <ShowProfile />
        </div>
      </div>
    </header>
  );
}
