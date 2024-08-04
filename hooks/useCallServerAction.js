"use client";

import { uploadImage } from "@/utils/fun";
import { useState } from "react";

import toast from "react-hot-toast";

const useServerAction = (asyncAction, input, afterAction) => {
  const [loading, setLoading] = useState(false);

  const res = async () => {
    setLoading(() => true);

    let resultImage = { imageUrl: null };
    if (input.image && input.image[0]) {
      resultImage = await uploadImage(input.image[0]);
    }

    const res = await asyncAction({
      ...input,
      image: resultImage.imageUrl,
    });

    setLoading(() => false);

    if (res.code === 200 || res.code === 201 || res.code === 202) {
      toast.success(res.message);
      afterAction && afterAction();
    } else {
      toast.error(res.message);
    }
  };

  return {
    loading,
    res,
  };
};

export default useServerAction;
