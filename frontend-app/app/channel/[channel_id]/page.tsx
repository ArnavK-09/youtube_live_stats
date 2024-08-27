"use client";

import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { Bubble } from "pixel-retroui";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { WS_SERVER_URL } from "@/consts";

type ServrRes = {
  views: number;
  id: string;
  subscribers: number;
  avatar: string;
  videos: number;
};

export default function ViewChannel({
  params,
}: {
  params: { channel_id: string };
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [subscribers, setSubscribers] = useState<number>(0o0);
  const [views, setViews] = useState<number>(0o0);
  const [videosCount, setVideosCount] = useState<number>(0o0);
  const [avatar, setAvatar] = useState<string>("/logo.png");
  const [ytId, setYTid] = useState<string>("");
  const [series, setSeries] = useState([
    {
      name: "subscribers",
      data: [0],
    },
  ]);
  const router = useRouter();

  const [data, setData] = useState({
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
        categories: [new Date().toLocaleDateString()],
      },
    },
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
  });

  const socket = new WebSocket(
    `wss://${WS_SERVER_URL}/channel?handle=${params.channel_id}`,
  );

  socket.addEventListener("message", (event) => {
    const eData: ServrRes = JSON.parse(event.data.toString());
    if (eData.avatar) setAvatar(eData.avatar);
    if (eData.id) setYTid(eData.id);
    if (eData.videos) setVideosCount(eData.videos);
    if (eData.views) setViews(eData.views);
    if (eData.subscribers) setSubscribers(eData.subscribers);

    series[0].data.push(eData.subscribers);
    data.options.xaxis.categories.push(new Date().toLocaleString());
  });

  socket.addEventListener("open", () => {
    setLoading(false);
  });

  socket.addEventListener("close", () => {
    router.push("/");
  });

  socket.addEventListener("error", () => {
    router.push(`/?error=Failed To Connect To Server`);
  });

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <section className="my-10 px-4 flex flex-col gap-10">
          <div>
            <div className="grid place-items-center">
              <img
                alt="logo"
                src={avatar}
                draggable={false}
                className="w-28 block mx-auto aspect-square my-10 ronded-full"
              />
            </div>
            <h1 className="text-xl md:text-6xl uppercase text-[#400810] font-bold">
              @{params.channel_id}
            </h1>
            <h1 className="text-sm text-red-600/60 font-semibold">{ytId}</h1>
            <h1
              className="my-10 text-white px-4 py-5 bg-gradient-to-br from-[#990931] to-[#f01819] text-2xl md:text-7xl tracking-tighter"
              style={{
                fontWeight: 1000,
              }}
            >
              {subscribers}
            </h1>
          </div>

          <div>
            <Bubble
              borderColor="#400810"
              bg="#f5d8cb"
              textColor="#f01819"
              className="bg-[#f5d8cb] block mx-auto cursor-default md:text-5xl font-bold leading-relaxed"
              direction="left"
            >
              Total Videos:{" "}
              <strong className="text-[#630010]">{videosCount}</strong> <br />
              Total Subs:
              <strong className="text-[#630010]">{subscribers}</strong> <br />
              Total Views: <strong className="text-[#630010]">
                {views}
              </strong>{" "}
              <br />
            </Bubble>
          </div>
          <div className="md:mt-20 hiddenScrollbar w-[90vw] h-[50vh] block mx-auto">
            <ReactApexChart
              options={data.options}
              series={series}
              type="line"
            />
          </div>
        </section>
      )}
    </>
  );
}
