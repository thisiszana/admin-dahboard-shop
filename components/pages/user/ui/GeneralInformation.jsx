import Image from "next/image";

import CustomInp from "@/components/shared/form/CustomInp";

import { images } from "@/constant";

export default function GeneralInformation({
  image,
  username,
  displayName,
  phoneNumber,
  address,
}) {
  const inputArray = [
    {
      label: "Username",
      value: username,
    },
    {
      label: "Name",
      value: displayName,
    },
    {
      label: "Phone Number",
      value: phoneNumber,
    },
    {
      label: "Address",
      value: address,
    },
  ];

  return (
    <div className="box w-full flex flex-col gap-7">
      <div className="w-full flex justify-center">
        <Image
          src={image || images.person}
          width={300}
          height={300}
          alt={username}
          className="rounded-full w-[100px] h-[100px] xl:w-[150px] xl:h-[150px] outline outline-2 outline-offset-8 outline-lightGray"
        />
      </div>
      <div className="flex flex-wrap gap-5 w-full">
        {inputArray.map((item) => (
          <CustomInp
            key={item.label}
            wrapperClassName="flex flex-1 xl:min-w-[300px] min-w-[200px]"
            label={item.label}
            value={item.value}
            readOnly={true}
            disabled={true}
          />
        ))}
      </div>
    </div>
  );
}
