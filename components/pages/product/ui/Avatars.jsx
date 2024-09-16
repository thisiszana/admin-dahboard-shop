"use client";

import { Avatar } from "antd";

import { images } from "@/constant";

const Avatars = ({ orders }) => {
  // This part has not been completed yet. I need to get the user's photo from getOrder using ID.
  if (orders?.length !== 0) {
    return (
      <>
        {orders?.length !== 0 && (
          <Avatar.Group maxCount={2} maxPopoverTrigger="click" size="default">
            {orders.map((item) => (
              <Avatar
                key={item.orderId._id}
                src={item?.orderId?.userId?.image || images.person}
                size="default"
              />
            ))}
          </Avatar.Group>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default Avatars;
