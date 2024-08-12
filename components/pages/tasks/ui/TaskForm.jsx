"use client";

import { useEffect, useState } from "react";

import { createTask, editTask } from "@/actions/task.action";
import { CircleClose } from "@/components/icons/Icon";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomInp from "@/components/shared/form/CustomInp";
import CustomSelect from "@/components/shared/form/CustomSelect";
import CustomTextarea from "@/components/shared/form/CustomTextarea";
import Loader from "@/components/shared/Loader";
import { images } from "@/constant";
import useServerAction from "@/hooks/useCallServerAction";
import { featchTask } from "@/services/queries";
import { MESSAGES } from "@/utils/message";
import { useQuery } from "@tanstack/react-query";
import { Avatar, DatePicker, Modal } from "antd";
import moment from "moment";
import toast from "react-hot-toast";

export default function TaskForm({
  type,
  taskID,
  isModalOpen,
  closeModal,
  session,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Todo",
    dueDate: "",
  });

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["task", taskID],
    queryFn: featchTask,
    staleTime: 0,
    cacheTime: 0,
    enabled: !!taskID,
  });
  useEffect(() => {
    if (data?.task) {
      setForm({
        title: data.task.title,
        description: data.task.description,
        status: data.task.status,
        dueDate: data.task.dueDate,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!!taskID && isModalOpen) {
      refetch();
    }
  }, [taskID, isModalOpen, refetch]);

  const onCancel = () => {
    closeModal();
    setForm({
      title: taskID ? data?.task?.title : "",
      description: taskID ? data?.task?.description : "",
      status: taskID ? data?.task?.status : "Todo",
      dueDate: taskID ? data?.task?.dueDate : "",
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const dateChange = (date) => {
    setForm({
      ...form,
      dueDate: date?.$d || "",
    });
  };

  const modalTitle = (
    <div className="flex items-center justify-between border-b pb-3 mb-5">
      <p className="text-p1 font-medium">
        {type === "create" ? "Create New Task" : "Edit Task"}
      </p>
      <CustomBtn
        icon={<CircleClose />}
        classNames="hoverable"
        onClick={closeModal}
        // disabled={createLoading}
      />
    </div>
  );

  const modalStyles = {
    content: {
      padding: "20px",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
  };

  const { loading: createLoading, res: createRes } = useServerAction(
    createTask,
    form,
    () => onCancel()
  );

  const { loading: editLoading, res: editRes } = useServerAction(
    editTask,
    { ...form, id: taskID },
    () => onCancel()
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      (form.title && form.title.length === 0) ||
      (form.status && form.status.length === 0) ||
      (form.dueDate && form.dueDate.length === 0)
    )
      toast.error(MESSAGES.fields);

    type === "create" ? createRes() : editRes();
  };

  return (
    <Modal
      title={modalTitle}
      onCancel={onCancel}
      style={modalStyles}
      closeIcon={false}
      open={isModalOpen}
      footer={false}
    >
      {isFetching ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-p1 font-medium text-red-500">
            Something went wrong ...
          </p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={onSubmit}>
          <CustomInp
            type="text"
            label="Title"
            name="title"
            onChange={onChange}
            value={form.title}
          />
          <CustomTextarea
            label="Description"
            name="description"
            onChange={onChange}
            value={form.description}
          />
          <CustomSelect
            label="Status"
            name="status"
            onChange={onChange}
            value={form.status}
            options={["Todo", "Progress", "Done"]}
          />
          <div className="space-y-2">
            <p className="font-medium text-p1">Created by</p>
            <div className="flex items-center gap-3">
              {/* <Avatar
                src={
                  data
                    ? data?.task?.createdBy?.image || images.admin
                    : session?.image || images.admin
                }
              /> */}
              <p className="font-medium text-p1">
                {data ? data?.task?.createdBy?.username : session?.username}
              </p>
            </div>
          </div>
          <hr />
          <div className="space-y-2">
            <p className="font-medium text-p1">Due Date</p>
            <div className="flex items-center gap-4">
              <DatePicker onChange={dateChange} />
              {form.dueDate && (
                <p className="capitalize">{moment(form.dueDate).fromNow()}</p>
              )}
            </div>
          </div>
          <hr />
          <div className="flex justify-end gap-3">
            <CustomBtn
              type="button"
              title="Cancel"
              classNames="border p-btn rounded-btn hoverable"
              disabled={createLoading || editLoading}
              onClick={onCancel}
            />
            <CustomBtn
              type="submit"
              title={
                createLoading || editLoading ? (
                  <Loader height={15} width={15} />
                ) : type === "create" ? (
                  "Submit"
                ) : (
                  "Edit"
                )
              }
              disabled={createLoading || editLoading}
              classNames={`font-medium p-btn rounded-btn ${
                createLoading || editLoading
                  ? "bg-lightGray"
                  : "bg-dark1 text-white"
              }`}
            />
          </div>
        </form>
      )}
    </Modal>
  );
}
