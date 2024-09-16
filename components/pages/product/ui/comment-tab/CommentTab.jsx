"use client";

import { Fragment, useEffect, useState } from "react";
import NextImage from "next/image";
import { images } from "@/constant";
import moment from "moment";
import { Empty } from "antd";
import { Image } from "@nextui-org/react";
import CustomBadge from "@/components/shared/CustomBadge";
import CommentAction from "@/components/pages/shared/CommentAction";
import { getComment } from "@/services/queries";
import Loader from "@/components/shared/Loader";

const CommentsTab = ({ comments }) => {
  const [commentDetails, setCommentDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      let details = [];

      for (const comment of comments) {
        const commentData = await getComment(comment);
        details.push(commentData.comment.comments);
      }

      setCommentDetails(details);
      setLoading(false);
    };

    fetchComments();
  }, [comments]); 

  if (loading) {
    return <main className="flex justify-center w-full">
        <Loader />
    </main>; 
  }

  if (commentDetails.length === 0) {
    return <Empty description="No Comments" />;
  }

  return (
    <div className="space-y-10">
      {commentDetails?.map((comment, index) => {
        const {
          _id,
          title,
          description,
          senderId,
          answer,
          status,
          published,
          createdAt,
        } = comment;

        return (
          <Fragment key={_id}>
            <div className="flex max-lg:flex-col gap-box">
              <div className="flex gap-box lg:flex-col lg:items-center lg:w-[20%]">
                <div className="flex justify-center">
                  <Image
                    as={NextImage}
                    src={senderId.image || images.person}
                    width={70}
                    height={70}
                    alt="user"
                    className="max-lg:w-[60px] max-lg:h-[60px]"
                  />
                </div>
                <div>
                  <p className="text-p1 font-medium lg:text-center">
                    {senderId.displayName}
                  </p>
                  <p className="text-p2 text-darkGray lg:text-center">
                    {moment(createdAt).format("l")}
                  </p>
                </div>
              </div>
              <diver className="lg:w-[80%]">
                <div className="flex gap-2 justify-between items-center mb-4 w-full">
                  <div className="flex gap-2">
                    <CustomBadge
                      condition={status === "Answered"}
                      title={status}
                    />
                    <CustomBadge
                      condition={published}
                      title={published ? "Published" : "Not-Published"}
                    />
                  </div>
                  <CommentAction
                    _id={JSON.parse(JSON.stringify(_id))}
                    answer={JSON.parse(JSON.stringify(answer))}
                    status={JSON.parse(JSON.stringify(status))}
                    published={JSON.parse(JSON.stringify(published))}
                  />
                </div>
                <h4 className="text-h4 font-bold mb-2">{title}</h4>
                <p className="text-p2">{description}</p>
              </diver>
            </div>
            {index < commentDetails.length - 1 && <hr />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default CommentsTab;
