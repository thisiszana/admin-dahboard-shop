"use client";

import { categories } from "@/constant";
import { DonutChart, Legend } from "@tremor/react";

let salesValues = [9800, 4567, 3908, 2400, 2174, 1398, 3908, 2400, 2174, 1398];
let sales = [];

for (let s in salesValues) {
  sales.push({
    value: salesValues[s],
    name: categories[s].title,
  });
}

export default function RevenueCompare() {
  const dataFormatter = (number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;
  return (
    <div className="box min-w-[280px] flex flex-col justify-between gap-5">
      <h1 className="h2">Category Revenue</h1>
      <DonutChart
        data={sales}
        variant="donut"
        valueFormatter={dataFormatter}
        showAnimation={true}
        animationDuration={1300}
      />
      <Legend
        categories={categories.map((c) => c.title)}
        colors={[
          "blue",
          "cyan",
          "indigo",
          "violet",
          "fuchsia",
          "blue",
          "cyan",
          "indigo",
          "violet",
          "fuchsia",
        ]}
        className="max-w-xs"
      />
    </div>
  );
}
