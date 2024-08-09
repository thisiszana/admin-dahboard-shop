"use client";

import { UploadIcon } from "@/components/icons/Icon";
import { Upload } from "antd";

const Dragger = Upload;

export default function UploadedImage({ form, setForm, image }) {
  const beforeUpload = (e) => {
    const { size } = e;

    if (size > 1 * 1000 * 1000) {
      message.error("File Too Large!");
      return Upload.LIST_IGNORE;
    }
  };
  const onChange = (e) => {
    const files = e.fileList.map((item) => item.originFileObj);

    setForm({ ...form, image: files });
  };
  return (
    <div>
      <Dragger
        className="flex flex-col justify-center items-center border-dashed bg-gray-50 border-2 rounded-xl"
        defaultFileList={
          Array.isArray(form.image) && form.image.length > 0
            ? form.image
            : Array.isArray(image)
            ? image
            : []
        }
        listType="picture"
        name="file"
        accept="image/png, image/jpeg, image/jpg image/webp"
        onChange={onChange}
        beforeUpload={beforeUpload}
        maxCount={1}
      >
        <div className="w-full rounded-3xl min-h-[150px] flex flex-col items-center justify-center gap-2 p-3 text-center">
          <div className="bg-gray-200 hover:bg-gray-300 Transition rounded-full w-[70px] h-[70px] text-[30px] flex items-center justify-center">
            <UploadIcon />
          </div>
          <div>
            <p>Drop or Select files</p>
            <p>JPG, PNG, JPEG, WEBP maximum 1 MB</p>
          </div>
        </div>
      </Dragger>
    </div>
  );
}
