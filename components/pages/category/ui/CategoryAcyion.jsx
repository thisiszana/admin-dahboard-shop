import Link from "next/link";

import { Tooltip } from "antd";

import { EyeOpen, LeftAngle } from "@/components/icons/Icon";
import CustomLink from "@/components/shared/CustomLink";
import CustomBtn from "@/components/shared/CustomBtn";

export default function CategoryAcyion({id}) {
  return (
    <div className="w-full flex justify-between items-center gap-3">
      <CustomLink
        href="/categories"
        className="backLink"
        title="Back"
        icon={<LeftAngle size={10} />}
      />
      <div className="flex items-center gap-3">
        <Tooltip placement="bottom" title="Go Live">
          <Link href="/" target="_blank">
            <CustomBtn
              icon={<EyeOpen className="text-darkGray" />}
              classNames="iconButton"
            />
          </Link>
        </Tooltip>
        <Tooltip placement="bottom" title="Edit">
          <Link href={`/categories/edit/${id}`}>
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
