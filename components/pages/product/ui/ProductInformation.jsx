"use client";

import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";

import { Image } from "@nextui-org/react";
import moment from "moment";

import { icons, images, productInformationDetails } from "@/constant";
import CustomBadge from "@/components/shared/CustomBadge";
import { Clock } from "@/components/icons/Icon";
import Avatars from "./Avatars";

export default function ProductInformation({ info }) {
  console.log(info)
  return (
    <div className="flex flex-col xl:flex-row gap-box">
      <div className="w-full xl:w-[50%] h-fit flex flex-col items-center box border">
        <div className="w-[500px] h-[500px] flex justify-center mb-4">
          <Image
            as={NextImage}
            src={info.image[0]}
            width={500}
            height={500}
            alt={info?.title}
            className="rounded-box"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {info.image.slice(1, 5).map((img, index) => (
            <div key={index} className="w-[100px] h-[100px] gap-x-3 border-1">
              <Image
                as={NextImage}
                src={img}
                width={100}
                height={100}
                alt={`Thumbnail ${index + 1}`}
                className="rounded-box object-cover"
              />
            </div>
          ))}
        </div>
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
        <p
          className={`text-p1 font-bold ${
            info?.stock !== 0 ? "text-darkGreen" : "text-darkRose"
          }`}
        >
          {info?.stock !== 0 ? "In Stock" : "Out of Stock"}
        </p>
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
              <p className="text-p2 text-darkGray">
                {info?.createdBy?.firstName}
              </p>
            </div>
          </Link>
        </div>
        <p className="font-bold text-h3">{info?.title}</p>
        <div className="flex items-center gap-3">
          <p className="text-p1 text-darkGray">
            ({info?.orders?.length} Orders)
          </p>
          <Avatars orders={JSON.parse(JSON.stringify(info?.orders))} />
        </div>
        <p className="text-darkGray text-p1">{info?.description}</p>
        <div className="border-t pt-2">
          <p className="text-p1 font-bold">Return policy :</p>
          <p className="text-darkGray text-sm">{info?.returnPolicy}</p>
        </div>
        <hr />
        {productInformationDetails(info).map((item) => (
          <div key={item.value} className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              {item.icon}
              <p className="text-p1 text-darkGray">{item.name}</p>
            </div>
            <p className="text-p1">{item.value}</p>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <span className="cardShadow rounded-lg p-3">{icons.color}</span>
            <p className="text-p1 text-darkGray">Colors :</p>
          </div>
          <div className="flex gap-2 items-center">
            {info.colors.map((color, index) => (
              <div
                key={index}
                style={{ backgroundColor: color }}
                className="w-6 h-6 rounded-full border"
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-p1 font-bold">Technical specifications :</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {info.specifications.map((spec) => (
              <div key={spec._id}>
                <div className="bg-gray-200 py-2 px-3 rounded-lg">
                  <p className="text-p1 text-[12px] font-bold">{spec.label}</p>
                  <p className="text-p1 text-xs my-2">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <p className="font-bold">Keywords :</p>
          {info.keywords.map((keyword, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded text-xs">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
