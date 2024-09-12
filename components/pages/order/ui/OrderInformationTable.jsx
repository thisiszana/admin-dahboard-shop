import { CreditCard, Date, Dollar, DollarBag, Location, Paypal, User } from "@/components/icons/Icon";
import CustomBadge from "@/components/shared/CustomBadge";
import { images } from "@/constant";
import { Avatar, Table } from "antd";
import moment from "moment";
import Link from "next/link";


export default function OrderInformationTable({
  customer,
  address,
  date,
  status,
  paymentMethod,
}) {
  const dataSourse = [
    {
      key: "customer",
      name: (
        <div className="flex items-center gap-4">
          <User size={18} />
          <p>Customer</p>
        </div>
      ),
      description: (
        <Link
          href={`/users/${customer?._id}`}
          className="flex items-center gap-3"
        >
          <Avatar src={customer?.image || images.person} />
          <p>{customer?.username}</p>
        </Link>
      ),
    },
    {
      key: "address",
      name: (
        <div className="flex items-center gap-4">
          <Location size={18} />
          <p>Address</p>
        </div>
      ),
      description: <p className="min-w-[250px]">{address}</p>,
    },
    {
      key: "date",
      name: (
        <div className="flex items-center gap-4">
          <Date size={18} />
          <p>Date</p>
        </div>
      ),
      description: moment(date).fromNow(),
    },
    {
      key: "status",
      name: (
        <div className="flex items-center gap-4">
          <Date size={18} />
          <p>Status</p>
        </div>
      ),
      description: (
        <CustomBadge condition={status === "Completed"} title={status} />
      ),
    },
    {
      key: "paymentMethod",
      name: (
        <div className="flex items-center gap-4">
          <Dollar size={18} />
          <p>Payment Method</p>
        </div>
      ),

      description: (
        <div className="flex items-center gap-2">
          {paymentMethod === "Credit Card" ? (
            <CreditCard className="text-darkRose" size={18} />
          ) : paymentMethod === "Paypal" ? (
            <Paypal className="text-darkBlue" size={18} />
          ) : (
            <DollarBag className="text-darkGreen" size={18} />
          )}
          <p>{paymentMethod}</p>
        </div>
      ),
    },
  ];

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
    },
  ];
  return (
    <div className="w-full tableContainer">
      <Table
        dataSource={dataSourse}
        columns={columns}
        pagination={false}
        scroll={{ x: true }}
        className="w-full"
      />
    </div>
  )
}
