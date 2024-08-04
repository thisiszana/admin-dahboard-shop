"use client";

import { Close, MenuBars, MenuDots } from "@/components/icons/Icon";
import CustomBtn from "../CustomBtn";
import { Fragment, useEffect, useState } from "react";
import { Drawer } from "antd";
import Link from "next/link";
import useSession from "@/hooks/session";
import Loader from "../Loader";
import Image from "next/image";
import { icons, images, menuLinks } from "@/constant";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const { data, isError, isLoading } = useSession();

  const pathname = usePathname();

  const onClose = () => setOpen(false);

  const _drawer = {
    styles: {
      body: { padding: "0px", margin: "10px 0px" },
      header: { padding: "15px 20px" },
    },
    title: (
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-[10px]">
          <div className="flex items-center italic font-bold">
            <span className="text-baseDark">Sorme</span>
            <span className="text-dark1">Shop</span>
          </div>
        </Link>
        <CustomBtn
          onClick={() => onClose()}
          icon={<Close />}
          classNames="iconButton"
        />
      </div>
    ),
  };
  return (
    <div>
      <CustomBtn
        icon={<MenuBars />}
        onClick={() => setOpen(true)}
        classNames="iconButton"
      />
      <Drawer
        placement="left"
        onClose={onClose}
        open={open}
        closeIcon={false}
        styles={_drawer.styles}
        title={_drawer.title}
        width={250}
      >
        <nav>
          <Link
            href="/"
            className="border-2 rounded-full p-2 mx-4 flex items-center justify-between gap-2 cursor-pointer hoverable"
            onClick={() => onClose()}
          >
            <div className="flex items-center gap-2">
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
                      className="w-[40px] h-[40px] rounded-full mr-5"
                    />
                    <p className="text-p1 font-bold capitalize">
                      {data?.session?.firstName}
                    </p>
                  </div>
                </>
              )}
            </div>
            <MenuDots size={15} wrapperClassName="iconButton" />
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
                    onClick={() => onClose()}
                  >
                    <div className="icon_size">{item.image}</div>
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
            <li className="rounded-btn mx-4 hover:bg-lightRose text-darkRose transition duration-75 ease-in-out">
              <button
                className="flex items-center w-full gap-[20px] p-[10px]"
                onClick={() => signOut()}
              >
                <div className="icon_size">{icons.power}</div>
                <span className="text-[17px] font-black">Exit</span>
              </button>
            </li>
          </ul>
        </nav>
      </Drawer>
    </div>
  );
}
