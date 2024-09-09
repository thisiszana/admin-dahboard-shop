"use client"

import { TrendDown, TrendUp } from "@/components/icons/Icon";
import { dashboardReviews } from "@/constant/dashboardInfo";
import { SparkAreaChart } from "@tremor/react";

export default function Reviews() {
  return (
    <div className="flex flex-wrap gap-5">
      {dashboardReviews.map((el, i) => {
        const { title, count, profit, chartData } = el;
        return (
          <div key={i} className="box flex flex-1 min-w-[280px]">
            <div className="w-full">
              <p className="text-p1 mb-7">{title}</p>
              <div className="flex justify-between w-full">
                <div>
                  <p className="h2">{count.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div
                      className={profit > 0 ? "text-green-500" : "text-red-500"}
                    >
                      {profit > 0 ? <TrendUp /> : <TrendDown />}
                    </div>
                    <span
                      className={profit > 0 ? "text-green-500" : "text-red-500"}
                    >
                      {profit}%
                    </span>
                    <p className="text-[14px] font-light">last month</p>
                  </div>
                </div>
                <SparkAreaChart
                  data={chartData}
                  categories={["Performance"]}
                  index={"month"}
                  colors={profit > 0 ? ["#22c55e"] : ["#e11d48"]}
                  className="h-10 w-[70px]"
                  showAnimation={true}
                  animationDuration={1300}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}
