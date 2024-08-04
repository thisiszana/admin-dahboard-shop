"use client";

import { signOut } from "@/actions/auth.action";
import { Power } from "../icons/Icon";
import CustomBtn from "./CustomBtn";

export default function SignoutBtn({ title, buttonClassName }) {
  return (
    <CustomBtn
      onClick={() => signOut()}
      title={title || <Power />}
      classNames={buttonClassName || "iconButton"}
    />
  );
}
