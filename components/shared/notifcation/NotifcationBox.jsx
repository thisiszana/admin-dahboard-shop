"use client";

import { Fragment, useState } from "react";

import Image from "next/image";

import { Bell, Comment, Mail, Truck } from "@/components/icons/Icon";
import { Popover, Tooltip } from "antd";
import CustomBtn from "../CustomBtn";
import { images } from "@/constant";

const notifications = [
  {
    key: "1",
    image: (
      <Image
        src={images.admin}
        width={100}
        height={100}
        alt="image"
        radius="full"
        className="w-[40px]"
      />
    ),
    text: "John Doe sent you a friend request",
    date: "3 hours",
    category: "Communication",
  },
  {
    key: "2",
    image: (
      <Image
        src={images.admin2}
        width={100}
        height={100}
        alt="image"
        radius="full"
        className="w-[40px]"
      />
    ),
    text: "Jayvon Hull has Mentioned you",
    date: "a day",
    category: "Project UI",
  },
  {
    key: "3",
    image: (
      <Image
        src={images.admin3}
        width={100}
        height={100}
        alt="image"
        radius="full"
        className="w-[40px]"
      />
    ),
    text: "Jason desson added new tags to file manager",
    date: "3 day",
    category: "File manager",
  },
  {
    key: "4",
    image: (
      <Truck wrapperClassName="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-lightGreen text-darkGreen" />
    ),
    text: "Your order is placed waiting for shipping",
    date: "5 day",
    category: "Order",
  },
  {
    key: "5",
    image: (
      <Comment wrapperClassName="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-lightOrange text-darkOrange" />
    ),
    text: "You have 5 new unread messages",
    date: "7 day",
    category: "Communication",
  },
  {
    key: "5",
    image: (
      <Mail wrapperClassName="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-lightRose text-darkRose" />
    ),
    text: "You have new mail",
    date: "8 day",
    category: "Communication",
  },
];

export default function NotifcationBox() {
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const content = (
    <div>
      {notifications.map((notif, index) => (
        <Fragment key={notif.key}>
          <div className="p-5 flex gap-4">
            <div>{notif.image}</div>
            <div>
              <p className="font-medium">{notif.text}</p>
              <p className="text-p2 text-gray-400">
                {notif.date} / {notif.category}
              </p>
            </div>
          </div>
          {index <= notifications.length - 1 && <hr />}
        </Fragment>
      ))}
    </div>
  );
  return (
    <>
      <Popover
        overlayInnerStyle={{
          padding: "0",
          margin: "0 20px",
          minWidth: "250px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
        open={open}
        onOpenChange={onOpenChange}
        trigger="click"
        content={content}
        title={
          <div className="flex items-center justify-between px-5 py-3">
            <h1 className="text-h4 bg-white/50">Notifications</h1>
            <Tooltip title="Mark all as read">
              <Mail
                wrapperClassName="iconButton cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </Tooltip>
          </div>
        }
      >
        <div className="relative">
          <CustomBtn
            icon={<Bell />}
            classNames="iconButton"
            onClick={() => setOpen(!open)}
          />
          <div className="bg-darkBlue text-white border-2 border-white rounded-full w-[20px] h-[20px] flex items-center justify-center text-[12px] absolute top-0 right-0">
            6
          </div>
        </div>
      </Popover>
    </>
  );
}
