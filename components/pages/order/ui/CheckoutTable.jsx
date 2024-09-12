import { orderPageCheckoutTableColumns } from "@/constant/tableColumns";
import { orderCheckoutSummaryDataSourse } from "@/constant/tableDataSourse";

import { Table } from "antd";

export default function CheckoutTable({ items, summary }) {
  return (
    <div className="w-full space-y-5">
      <div className="w-full tableContainer">
        <Table
          columns={orderPageCheckoutTableColumns}
          dataSource={orderCheckoutSummaryDataSourse(items)}
          pagination={false}
          scroll={{ x: true }}
        />
      </div>
      <div className="w-full flex justify-end subtitle">
        <div className="w-full xl:w-[40%] border rounded-xl p-5">
          <div className="flex items-center justify-between w-full mb-3">
            <p>Total Products</p>
            <p>{summary.totalProducts}</p>
          </div>
          <div className="flex items-center justify-between w-full my-3">
            <p>Total Price</p>
            <p>${summary.totalPrice.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between w-full my-3">
            <p>Total Discount</p>
            <p>${summary.totalDiscount.toLocaleString()}</p>
          </div>
          <hr />
          <div className="flex items-center justify-between w-full mt-3 font-bold">
            <p>Total Paid</p>
            <p>${summary.totalPayable.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
