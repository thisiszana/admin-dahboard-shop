"use client";

import { useState } from "react";

import api from "@/configs/api";

import toast from "react-hot-toast";

export const useCommentAction = (
  { id, productId, action, value = "" },
  callback
) => {
  const [loading, setLoading] = useState(false);

  const res = async () => {
    setLoading(() => true);
    try {
      const res = await api.post(`/api/comments/${id}`, {
        productId,
        action,
        value,
      });

      console.log("useComment", res);

      if (
        res.data.data.status === 200 ||
        res.data.data.status === 201 ||
        res.data.data.status === 202
      ) {
        toast.success(res.data.data.msg);
        callback && callback();
      }
    } catch (error) {
      toast.error(res.data.data.msg);
      console.error("Action failed:", error);
    } finally {
      setLoading(() => false);
    }
  };

  return { loading, res };
};
