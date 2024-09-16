import { Tabs } from "antd";

import { BorderHeart, Comment, Truck } from "@/components/icons/Icon";
import CommentTab from "./comment-tab/CommentTab";
import OrdersTab from "./orders-tab/OrdersTab";
import LikesTab from "./likes-tab/LikesTab";

export default function ActiveTab({ comments, orders, likes, productId }) {
  const items = [
    {
      key: "Comments",
      label: (
        <div className="flex items-center gap-box">
          <Comment />
          <p>Comments</p>
        </div>
      ),
      children: <CommentTab comments={JSON.parse(JSON.stringify(comments))} />,
    },
    {
      key: "Orders",
      label: (
        <div className="flex items-center gap-box">
          <Truck />
          <p>Orders</p>
        </div>
      ),
      children: (
        <OrdersTab
          orders={JSON.parse(JSON.stringify(orders))}
          productId={JSON.parse(JSON.stringify(productId))}
        />
      ),
    },
    // {
    //   key: "Likes",
    //   label: (
    //     <div className="flex items-center gap-box">
    //       <BorderHeart />
    //       <p>Likes</p>
    //     </div>
    //   ),
    //   children: <LikesTab likes={likes} />,
    // },
  ];
  return (
    <Tabs
      defaultActiveKey="Comments"
      items={items}
      animated
      className="box border"
    />
  );
}
