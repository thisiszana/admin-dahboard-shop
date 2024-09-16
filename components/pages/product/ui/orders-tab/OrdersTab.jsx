import { getOrder } from "@/actions/order.action";
import { productOrdersColumns } from "@/constant/tableColumns";
import { productOrdersTabDataSourse } from "@/constant/tableDataSourse";
import { Table, Empty } from "antd";

export default async function OrdersTab({ orders, productId }) {
  if (orders.length === 0) {
    return <Empty description="No Orders!" />;
  }

  let productOrders = [];

  for (const i of orders) {
    const orderData = await getOrder(i.orderId);

    const filteredItems = orderData.order.items.filter(
      (item) => item.productId === productId
    );

    if (filteredItems.length > 0) {
      productOrders.push({ ...filteredItems[0], orderId: orderData.order._id });
    }
  }

  if (productOrders.length === 0) {
    return <Empty description="No Orders for this product!" />;
  }

  return (
    <Table
      pagination={false}
      columns={productOrdersColumns}
      dataSource={productOrdersTabDataSourse(
        JSON.parse(JSON.stringify(productOrders))
      )}
    />
  );
}
