import Image from "next/image";

import moment from "moment";

import CustomBadge from "@/components/shared/CustomBadge";
import { BorderHeart } from "@/components/icons/Icon";
import FullScreenImage from "./FullScreenImage";
import { shorterText } from "@/utils/fun";

export default function BlogContent({
  _id,
  title,
  description,
  image,
  keywords,
  likes,
  published,
  createdAt,
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-h3 font-bold">Blog #{shorterText(_id, 5)}</h3>
            <CustomBadge
              condition={published}
              title={published ? "Published" : "Draft"}
            />
          </div>
          <p className="text-p2 text-darkGray">
            {moment(createdAt).format("LLL")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span>{likes?.length}</span>
          <BorderHeart />
        </div>
      </div>
      <div className="relative rounded-btn overflow-hidden bg-black">
        <Image
          src={image}
          width={2300}
          height={1080}
          alt={title}
          className="w-full h-[60vh] object-none object-center"
        />
        <div className="w-full py-12 p-8 h-full bg-gradient-to-r flex flex-col justify-between from-black to-transparent absolute z-10 inset-0">
          <h1 className="h1 text-white lg:w-[60%] ">{title}</h1>
          <FullScreenImage
            image={JSON.parse(JSON.stringify(image))}
            title={JSON.parse(JSON.stringify(title))}
          />
        </div>
      </div>
      <p>{description}</p>
      {keywords.length !== 0 && (
        <div className="flex flex-wrap gap-3">
          {keywords.map((keyword) => (
            <div
              key={keyword}
              className="w-fit h-fit p-btn bg-lightGray hover:bg-gray-200 Transition text-p1 rounded-btn"
            >
              {keyword}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
