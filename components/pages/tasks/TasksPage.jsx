import { Suspense } from "react";

import TasksListSkeletons from "@/components/shared/skeletons/TasksListSkeletons";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { tasksPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import { getServerSession } from "@/utils/session";
import CreateNewTask from "./ui/CreateNewTask";
import TasksList from "./ui/TasksList";

export default function TasksPage() {
  const session = getServerSession();
  return (
    <>
      <PageHeading title="Tasks" />
      <CustomBreadcrumb items={tasksPageBread} />
      <CreateNewTask session={session} />
      <Suspense fallback={<TasksListSkeletons />}>
        <TasksList />
      </Suspense>
    </>
  );
}
