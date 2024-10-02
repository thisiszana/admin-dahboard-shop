"use client";

import NextImage from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import { Image } from "@nextui-org/react";
import moment from "moment";

import { icons, images, productInformationDetails } from "@/constant";
import CustomBadge from "@/components/shared/CustomBadge";
import { Clock } from "@/components/icons/Icon";
import Avatars from "./Avatars";

export default function ProductInformation({ info }) {
  const [imgUrl, setImgUrl] = useState("");
  const [zoomStyle, setZoomStyle] = useState({
    display: "none",
    zoomX: "0%",
    zoomY: "0%",
  });

  useEffect(() => {
    if (info) setImgUrl(info?.image[0]);
  }, [info]);

  const handleMouseMove = (e) => {
    const imageZoom = e.currentTarget;
    const pointer = {
      x: (e.nativeEvent.offsetX * 100) / imageZoom.offsetWidth,
      y: (e.nativeEvent.offsetY * 100) / imageZoom.offsetHeight,
    };

    setZoomStyle({
      display: "block",
      zoomX: `${pointer.x}%`,
      zoomY: `${pointer.y}%`,
    });
  };

  const handleMouseOut = () => {
    setZoomStyle({
      display: "none",
      zoomX: "0%",
      zoomY: "0%",
    });
  };

  return (
    <div className="flex flex-col xl:flex-row gap-box">
      <div className="w-full xl:w-[50%] h-fit flex flex-col items-center box border">
        <div
          className="w-full xl:w-[50%] flex justify-center mb-4 relative"
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
          style={{
            "--zoom-x": zoomStyle.zoomX,
            "--zoom-y": zoomStyle.zoomY,
            "--display": zoomStyle.display,
            "--url": `url(${imgUrl})`,
          }}
        >
          <Image
            as={NextImage}
            src={imgUrl}
            width={500}
            height={500}
            alt={info?.title}
            className="rounded-box"
          />
          <div
            style={{
              display: zoomStyle.display === "block" ? "block" : "none",
              content: '""',
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: "200%",
              backgroundPosition: `${zoomStyle.zoomX} ${zoomStyle.zoomY}`,
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 10,
              cursor:pointer,
            }}
          ></div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {info.image.map((img, index) => (
            <div
              key={index}
              className="w-[100px] h-[100px] rounded-box gap-x-3 border-1"
            >
              <Image
                as={NextImage}
                src={img}
                width={100}
                height={100}
                alt={`Thumbnail ${index + 1}`}
                className="rounded-box object-cover cursor-pointer"
                onClick={() => setImgUrl(img)}
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
          <div className="flex gap-2 items-center p-[8px] rounded-full border-1 border-black">
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
                  <p className="text-p1 text-xs font-bold capitalize">
                    {spec.label}
                  </p>
                  <p className="text-p1 text-xs my-2 capitalize">
                    {spec.value}
                  </p>
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
