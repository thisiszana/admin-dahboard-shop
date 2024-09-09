"use client";

import { AreaChart } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    Phone: 2890,
    Laptop: 2338,
  },
  {
    date: "Feb 22",
    Phone: 2756,
    Laptop: 2103,
  },
  {
    date: "Mar 22",
    Phone: 3322,
    Laptop: 2194,
  },
  {
    date: "Apr 22",
    Phone: 3470,
    Laptop: 2108,
  },
  {
    date: "May 22",
    Phone: 3475,
    Laptop: 1812,
  },
  {
    date: "Jun 22",
    Phone: 3129,
    Laptop: 1726,
  },
  {
    date: "Jul 22",
    Phone: 3490,
    Laptop: 1982,
  },
  {
    date: "Aug 22",
    Phone: 2903,
    Laptop: 2012,
  },
  {
    date: "Sep 22",
    Phone: 2643,
    Laptop: 2342,
  },
  {
    date: "Oct 22",
    Phone: 2837,
    Laptop: 2473,
  },
  {
    date: "Nov 22",
    Phone: 2954,
    Laptop: 3848,
  },
  {
    date: "Dec 22",
    Phone: 3239,
    Laptop: 3736,
  },
];
const valueFormatter = function (number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export default function TotoalRevenue() {
  return (
    <div className="box w-full">
      <h1 className="h2">Total Revenue</h1>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={["Phone", "Laptop"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
        showAnimation={true}
        animationDuration={1300}
      />
    </div>
  );
}
