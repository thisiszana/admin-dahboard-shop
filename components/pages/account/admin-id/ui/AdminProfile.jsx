import { notFound } from "next/navigation";
import Image from "next/image";

import { getAdmin } from "@/actions/admin.action";
import CustomBadge from "@/components/shared/CustomBadge";
import DetailedBox from "@/components/shared/layout/DetailedBox";
import { images } from "@/constant";
import { Date, Flag, Location, Mail, Mobile } from "@/components/icons/Icon";
import moment from "moment";
import Link from "next/link";

export default async function AdminProfile({ id: { id } }) {
  const { admin } = await getAdmin(id);

  if (!admin) return notFound();

  const {
    username,
    firstName,
    email,
    phoneNumber,
    address,
    country,
    image,
    roll,
    createdAt,
    productsCreated,
  } = admin;

  const overviewContent = (
    <div className="w-full box border flex flex-col items-center gap-1">
      <div className="flex justify-center w-full mb-4">
        <Image
          src={image || images.admin}
          width={200}
          height={200}
          style={{ width: "200px", height: "auto", borderRadius: "50%" }}
          alt="admin"
        />
      </div>
      <CustomBadge title={roll} condition={roll === "OWNER"} />
      <p className="text-h3 font-bold">{username}</p>
      <p className="text-p1 text-darkGray font-medium capitalize">
        {firstName}
      </p>
    </div>
  );

  const aboutContent = (
    <div className="w-full box border flex flex-col gap-3">
      <div className="flex items-center gap-5">
        <Location />
        <p className="text-p1 font-medium line-clamp-2">{address || "_"}</p>
      </div>
      <div className="flex items-center gap-5">
        <Mail />
        <p className="text-p1 font-medium line-clamp-2">{email || "_"}</p>
      </div>
      <div className="flex items-center gap-5">
        <Mobile />
        <p className="text-p1 font-medium line-clamp-2">{phoneNumber || "_"}</p>
      </div>
      <div className="flex items-center gap-5">
        <Flag />
        <p className="text-p1 font-medium line-clamp-2">{country || "_"}</p>
      </div>
      <div className="flex items-center gap-5">
        <Date />
        <p className="text-p1 font-medium line-clamp-2">
          {moment(createdAt).format("LL")}
        </p>
      </div>
    </div>
  );

  const productsContent =
    productsCreated && productsCreated.length === 0 ? (
      <p>No Products Created!</p>
    ) : (
      <div className="flex flex-wrap gap-6 box border w-full">
        {productsCreated.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="flex flex-col gap-2 items-center flex-1 min-w-[200px] box border hoverable"
          >
            <Image width={100} height={100} src={product.image} alt="product" />
            <p className="text-p1 font-medium">${product.price}</p>
            <p className="text-p2">{moment(product.createdAt).format("L")}</p>
          </Link>
        ))}
      </div>
    );

  const blogsContent = <p>No Blogs Created!</p>;

  return (
    <div className="space-y-5">
      <DetailedBox title="Overview" content={overviewContent} />
      <DetailedBox title="About" content={aboutContent} />
      <DetailedBox title="Products Created" content={productsContent} />
      <DetailedBox title="Blogs Created" content={blogsContent} />
    </div>
  );
}
