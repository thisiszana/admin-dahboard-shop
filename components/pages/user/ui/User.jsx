import DetailedBox from "@/components/shared/layout/DetailedBox";

import GeneralInformation from "./GeneralInformation";
import UserComments from "./UserComments";
import UserOrders from "./UserOrders";
import UserLikes from "./UserLikes";

export default function User({ user }) {
  const userInfo = user[0]?.user;
  console.log(user)
  const generalInfoProps = {
    image: userInfo.image,
    username: userInfo.username,
    displayName: userInfo.displayName,
    phoneNumber: userInfo.phoneNumber,
    address: userInfo.address,
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
          <UserOrders orders={JSON.parse(JSON.stringify(userInfo.orders))} />
        }
      />
      <DetailedBox
        title="Comments"
        content={
          <UserComments comments={JSON.parse(JSON.stringify(userInfo.comments))} />
        }
      />
      {/*<DetailedBox
        title="Likes"
        content={<UserLikes likes={JSON.parse(JSON.stringify(user.likes))} />}
      /> */}
    </div>
  );
}
