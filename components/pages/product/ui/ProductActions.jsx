import Link from "next/link";

import { Tooltip } from "antd";
import { Edit, EyeOpen, LeftAngle } from "@/components/icons/Icon";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomLink from "@/components/shared/CustomLink";

export default function ProductActions({ id }) {
  return (
    <div className="w-full flex justify-between items-center gap-3">
      <CustomLink
        href="/products"
        className="backLink"
        title="Back"
        icon={<LeftAngle size={10} />}
      />
      <div className="flex items-center gap-3">
        <Tooltip placement="bottom" title="Go Live">
          <Link
            href={`${process.env.NEXT_PUBLIC_LIVE_URL}/products/${id}`}
            target="_blank"
          >
            <CustomBtn
              icon={<EyeOpen className="text-darkGray" />}
              classNames="iconButton"
            />
          </Link>
        </Tooltip>
        <Tooltip placement="bottom" title="Edit">
          <Link href={`/products/edit/${id}`}>
            <CustomBtn
              icon={<Edit className="text-darkGray" />}
              classNames="iconButton"
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
