"use client";

import { Bubble } from "pixel-retroui";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";

export default function ViewChannel({
  params,
}: {
  params: { channel_id: string };
}) {
  const data = {
    options: {
      colors: [
        "#400810",
        "#630010",
        "#990931",
        "#f01819",
        "#f97d6d",
        "#ffbab5",
        "#ffeae0",
      ],
      chart: {
        id: `${params.channel_id}-bar`,
      },
      xaxis: {
        categories: [new Date().toLocaleString(), new Date().toLocaleString()],
      },
    },
    series: [
      {
        name: "subscribers",
        data: [45353, 232],
      },
    ],
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <div>
        <h1 className="text-xl md:text-6xl uppercase text-[#400810] font-bold">
          @{params.channel_id}
        </h1>
        <h1 className="text-sm text-red-600/60 font-semibold">22323243dsfsd</h1>
        <h1
          className="my-10 text-white px-4 py-5 bg-gradient-to-br from-[#990931] to-[#f01819] text-2xl md:text-7xl tracking-tighter"
          style={{
            fontWeight: 1000,
          }}
        >
          232343
        </h1>
      </div>

      <div className="hiddenScrollbar max-w-[90vw] block mx-auto">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="line"
          width="500"
        />
      </div>

      <div>
        <Bubble
          borderColor="#400810"
          bg="#f5d8cb"
          textColor="#f01819"
          className="bg-[#f5d8cb] block mx-auto cursor-default md:text-5xl font-bold leading-relaxed"
          direction="left"
        >
          Total Videos: <strong className="text-[#630010]">2323</strong> <br />
          Total Subscribers: <strong className="text-[#630010]">
            2323
          </strong>{" "}
          <br />
          Total Views: <strong className="text-[#630010]">2323</strong> <br />
        </Bubble>
      </div>
    </>
  );
}
