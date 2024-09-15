"use client";

import NextImage from "next/image";

import { Clock } from "@/components/icons/Icon";
import CustomBadge from "@/components/shared/CustomBadge";
import { images } from "@/constant";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import moment from "moment";

export default function CategoryInformation({ info }) {
  return (
    <div className="flex flex-col xl:flex-row gap-box">
      <div className="w-full xl:w-[50%] h-fit flex justify-center box border">
        <Image
          as={NextImage}
          src={info.image}
          width={500}
          height={500}
          alt={info?.name}
          className="rounded-box"
        />
      </div>
      <div className="w-full xl:w-[50%] space-y-5 box border">
        <div className="flex gap-2 items-center">
          <Clock
            className="text-darkGray"
            wrapperClassName="cardShadow rounded-btn p-3"
          />
          <div>
            <p className="font-bold text-darkGray text-sm">
              {moment(info?.createdAt).calendar()}
            </p>
            <p className="text-xs text-darkGray">
              {moment(info?.createdAt).format("LT")}
            </p>
          </div>
        </div>
        <CustomBadge
          condition={info?.published}
          title={info?.published ? "Published" : "Draft"}
        />
        <div className="space-y-2">
          <p className="text-p2">Created By:</p>
          <Link
            href={`/account/admins/${info?.createdBy?._id}`}
            className="flex items-center gap-3"
          >
            <Image
              as={NextImage}
              src={info?.createdBy.image || images.admin}
              width={100}
              height={100}
              alt="creator"
              className="rounded-full w-30 h-30"
            />
            <div>
              <p className="text-p1 font-medium">{info?.createdBy?.username}</p>
              <p className="text-p2 text-darkGray">{info?.createdBy?.name}</p>
            </div>
          </Link>
        </div>
        <p className="font-bold text-h3">{info?.name}</p>
        <p className="text-darkGray text-p1">{info?.description}</p>
      </div>
    </div>
  );
}
