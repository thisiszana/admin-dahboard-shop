import { upcommingEvents } from "@/actions/task.action";

import EventsTable from "./EventsTable";

export default async function UpcommingEvents() {
  const data = await upcommingEvents();

  if (data.code !== 200) {
    return <p>Error</p>;
  }
  return <EventsTable events={JSON.parse(JSON.stringify(data.tasks))} />;
}
