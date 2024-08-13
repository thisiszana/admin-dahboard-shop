import Link from "next/link";

import { Avatar } from "antd";
import moment from "moment";

import CustomBadge from "../../CustomBadge";
import { shorterText } from "@/utils/fun";

const TasksResult = ({ tasks, closeModal }) => {
  return (
    <div>
      <h1 className="text-h3 font-medium mb-2">Tasks</h1>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="hoverable rounded-btn py-2 px-3 space-y-3 cardShadow3 border mb-2"
        >
          <p className="text-p1 font-medium">{task.title}</p>
          <p className="text-p2 text-darkGray">{task.description}</p>
          <div className="w-full flex justify-end">
            <CustomBadge
              title={task.status}
              colors={
                task.status === "Todo"
                  ? "text-darkBlue bg-lightBlue"
                  : task.status === "Progress"
                  ? "text-darkOrange bg-lightOrange"
                  : "text-darkGreen bg-lightGreen"
              }
            />
          </div>
          <hr />
          <div className="flex items-center justify-between flex-wrap gap-2 w-full">
            <Link
              href={`/account/admin/${task.createdBy._id}`}
              className="flex items-center gap-4"
              onClick={closeModal}
            >
              <Avatar
                src={task.createdBy.image || images.admin}
                radius="full"
              />
              <div>
                <p className="text-p1 font-medium">{task.createdBy.username}</p>
                <p className="text-p2 text-darkGray">
                  {shorterText(task.createdBy.firstName, 15)}
                </p>
              </div>
            </Link>
            <p className="text-p2 text-darkGray">
              {moment(task.createdAt).fromNow()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksResult;
