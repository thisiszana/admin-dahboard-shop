"use client";

import { useState } from "react";

import api from "@/configs/api";

import toast from "react-hot-toast";

export const useCommentAction = (
  { id, productId, action, value = "" },
  callback
) => {
  const [loading, setLoading] = useState(false);
console.log(id)
  const res = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/api/comments/${id}`, {
        productId,
        action,
        value,
      });

      console.log("useComment", res);

      if (
        res.data.code === 200 ||
        res.data.code === 201 ||
        res.data.code === 202
      ) {
        toast.success(res.data.data.message);
        callback && callback();
      }
    } catch (error) {
      toast.error(res.data.data.message);
      console.error("Action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, res };
};
