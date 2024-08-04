"use client";

import { Close, MenuBars, MenuDots } from "@/components/icons/Icon";
import CustomBtn from "../CustomBtn";
import { useEffect, useState } from "react";
import { Drawer } from "antd";
import Link from "next/link";
import useSession from "@/hooks/session";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const { data, isError, isLoading } = useSession();

  


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
              {/* image admin */}
              {admin && (
            <p className="text-p2 capitalize">{admin.firstName}</p>
          )}
            </div>
            <MenuDots size={15} wrapperClassName="iconButton" />
          </Link>
          <div className="ml-4 mb-2 mt-5">
            <h1 className="text-p1 text-gray-400">Overview</h1>
          </div>
        </nav>
      </Drawer>
    </div>
  );
}
