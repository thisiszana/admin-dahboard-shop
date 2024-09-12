import OrderDetailsPage from "@/components/pages/order/OrderDetailsPage";

export default function OrderِDetails({ params }) {
  return <OrderDetailsPage id={params.id} />;
}
