import { getOrder } from "@/actions/order.action";
import { Document, LeftAngle, ShoppingCart } from "@/components/icons/Icon";
import CustomBadge from "@/components/shared/CustomBadge";
import CustomLink from "@/components/shared/CustomLink";
import DetailedBox from "@/components/shared/layout/DetailedBox";
import { shorterText } from "@/utils/fun";
import moment from "moment";
import { notFound } from "next/navigation";
import OrderInformationTable from "./OrderInformationTable";
import CheckoutTable from "./CheckoutTable";

export default async function Order({ id }) {
  const data = await getOrder(id);
  console.log("client order data", data);

  if (!data.order) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <CustomLink
          icon={<LeftAngle size={13} className="text-darkGray" />}
          href="/orders"
          className="backLink w-fit h-fit"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-h3 font-bold">
              Order #{shorterText(data.order._id, 5)}
            </h3>
            <CustomBadge
              condition={data.order.status === "Completed"}
              title={data.order.status}
            />
          </div>
          <p className="text-p2 text-darkGray">
            {moment(data.order.createdAt).format("LLL")}
          </p>
        </div>
      </div>
      <DetailedBox
        title="Order Information"
        icon={
          <Document wrapperClassName="cardShadow rounded-xl p-3" size={20} />
        }
        content={
          <OrderInformationTable
            address={JSON.parse(JSON.stringify(data?.order?.deliveryAddress))}
            customer={JSON.parse(JSON.stringify(data?.order?.userId))}
            date={JSON.parse(JSON.stringify(data?.order?.createdAt))}
            paymentMethod={JSON.parse(
              JSON.stringify(data?.order?.paymentMethod)
            )}
            status={JSON.parse(JSON.stringify(data?.order?.status))}
          />
        }
      />
      <DetailedBox
        title="Checkout Summary"
        icon={
          <ShoppingCart
            wrapperClassName="cardShadow rounded-xl p-3"
            size={20}
          />
        }
        content={
          <CheckoutTable
            items={JSON.parse(JSON.stringify(data?.order?.items))}
            summary={JSON.parse(JSON.stringify(data?.order?.summary))}
          />
        }
      />
    </div>
  );
}
