"use client";

import { Fragment } from "react";

import Image from "next/image";
import Link from "next/link";

import { LayerPlus, MenuDots } from "@/components/icons/Icon";
import { images, menuLinks } from "@/constant";
import useSession from "@/hooks/session";
import { usePathname } from "next/navigation";
import Loader from "../Loader";

export default function Sidebar() {
  const pathname = usePathname();
  const { data, isError, isLoading } = useSession();

  return (
    <aside className="w-[250px] border-r border-gray-200 max-md:hidden fixed z-30 left-0 h-screen bg-white overflow-y-auto sidebarScroll">
      <div className="flex items-center justify-between fixed bg-white p-4 top-0 w-[250px] z-20 border-r border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-[10px]">
          {/* // Logo */}

          <div className="flex items-center italic font-bold">
            <span className="text-baseDark">Online</span>
            <span className="text-dark1">Shop</span>
          </div>
        </Link>
      </div>
      <nav className="pt-[74px] pb-5">
        <Link
          href="/account"
          className="border-2 rounded-full p-2 mx-4 flex items-center justify-between gap-2 cursor-pointer hoverable"
        >
          {isLoading && (
            <div className="flex items-center justify-center w-full py-1">
              <Loader width={20} height={20} />
            </div>
          )}
          {isError && <p>Error!</p>}
          {data?.success && (
            <>
              <div className="flex items-center gap-2">
                <Image
                  src={data?.session?.image || images.admin}
                  width={100}
                  height={100}
                  alt="user"
                  radius="full"
                  className="w-[35px] h-[35px] rounded-full mr-5"
                />
                <p className="text-p2 capitalize">{data?.session?.firstName}</p>
              </div>
              <MenuDots size={15} wrapperClassName="iconButton" />
            </>
          )}
        </Link>
        <div className="ml-4 mb-2 mt-5">
          <h1 className="text-p1 text-gray-400">Overview</h1>
        </div>
        <ul>
          {menuLinks.map((item) => (
            <Fragment key={item.title}>
              <li
                className={`rounded-l-btn ml-4 Transition mb-[2px] border-r-4 ${
                  pathname === item.link
                    ? "bg-baseLight text-baseDark border-darkPurple"
                    : "bg-white text-black hover:bg-lightGray border-transparent"
                }`}
              >
                <Link
                  href={item.link}
                  className="flex Transition items-center gap-[20px] py-[12px] px-[10px]"
                >
                  <div>{item.image}</div>
                  <span className="text-p1">{item.title}</span>
                </Link>
              </li>
              {item.title === "Dashboard" && (
                <div className="ml-4 mb-2 mt-5">
                  <h1 className="text-p1 text-gray-400">Management</h1>
                </div>
              )}
              {item.title === "Add Blog" && (
                <div className="ml-4 mb-2 mt-5">
                  <h1 className="text-p1 text-gray-400">Settings</h1>
                </div>
              )}
            </Fragment>
          ))}
          <li className="rounded-btn mx-4 bg-gradient-to-br mt-2 from-gray-200 to-transparent transition duration-75 ease-in-out">
            <Link
              href="/tasks"
              className="flex flex-col Transition items-center gap-[10px] py-[12px] px-[10px]"
            >
              <div className="rounded-2xl p-3 bg-gradient-to-tr from-darkPurple to-purple-300 text-white">
                <LayerPlus />
              </div>
              <span className="text-p1 font-medium">Create New Task</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
