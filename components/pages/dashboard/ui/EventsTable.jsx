"use client";

import Link from "next/link";

import { upcommingEventsDataSourse } from "@/constant/tableDataSourse";
import { upcommingEventsCollumns } from "@/constant/tableColumns";
import { RightAngle } from "@/components/icons/Icon";

import { Table } from "antd";

export default function EventsTable({ events }) {
  return (
    <div className="tableContainer border-none min-w-[280px] max-xl:w-full xl:w-1/3 h-fit">
      <div className="p-6">
        <h1 className="h2">Upcomming Events</h1>
      </div>
      <Table
        columns={upcommingEventsCollumns}
        dataSource={upcommingEventsDataSourse(events)}
        pagination={false}
        scroll={{ x: true }}
        showHeader={false}
      />
      <Link
        href="/tasks"
        className="flex items-center gap-3 m-3 hoverable w-fit p-btn rounded-btn"
      >
        <p className="text-p2">See All Events</p> <RightAngle size={10} />
      </Link>
    </div>
  );
}
