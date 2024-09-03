import DetailedBox from "@/components/shared/layout/DetailedBox";

import GeneralInformation from "./GeneralInformation";
import UserComments from "./UserComments";
import UserOrders from "./UserOrders";
import UserLikes from "./UserLikes";

export default function User({ user }) {
  const generalInfoProps = {
    image: user.image,
    username: user.username,
    displayName: user.displayName,
    phoneNumber: user.phoneNumber,
    address: user.address,
  };
  return (
    <div className="flex flex-col gap-5">
      <DetailedBox
        title="General"
        content={<GeneralInformation {...generalInfoProps} />}
      />
      <DetailedBox
        title="Orders"
        content={
          <UserOrders orders={JSON.parse(JSON.stringify(user.orders))} />
        }
      />
      {/*<DetailedBox
        title="Comments"
        content={
          <UserComments comments={JSON.parse(JSON.stringify(user.comments))} />
        }
      />
      <DetailedBox
        title="Likes"
        content={<UserLikes likes={JSON.parse(JSON.stringify(user.likes))} />}
      /> */}
    </div>
  );
}
