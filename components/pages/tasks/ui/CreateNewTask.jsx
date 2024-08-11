"use client";

import { useState } from "react";

import CustomBtn from "@/components/shared/CustomBtn";
import { AddFolder } from "@/components/icons/Icon";
import TaskForm from "./TaskForm";

export default function CreateNewTask({ session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="w-full flex justify-end">
        <CustomBtn
          icon={<AddFolder />}
          title="Create Task"
          classNames="bg-dark1 text-white rounded-btn py-2.5 px-5 flex items-center gap-3 font-medium"
          onClick={openModal}
        />
        {isModalOpen && (
          <TaskForm
            type="create"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            closeModal={closeModal}
            taskID={null}
            session={session}
          />
        )}
      </div>
    </>
  );
}
