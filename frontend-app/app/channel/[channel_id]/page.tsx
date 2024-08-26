"use client";

import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { Bubble } from "pixel-retroui";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

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
  const [loading, setLoading] = useState<boolean>(!true);
  const [subscribers, setSubscribers] = useState<number>(0o0);
  const [views, setViews] = useState<number>(0o0);
  const [videosCount, setVideosCount] = useState<number>(0o0);
  const [avatar, setAvatar] = useState<string>("/logo.png");
  const [ytId, setYTid] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([
    new Date().toLocaleString(),
  ]);
  const [series, setSeries] = useState([
    {
      name: "subscribers",
      data: [0],
    },
  ]);
  const router = useRouter();

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
        categories: categories,
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
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     // series[0].data.push(Math.floor(Math.random() * 1000) + 1);
  //     categories.push(new Date().toLocaleString());
  //   }, 1000 * 1.5);
  // }, []);

  const socket = new WebSocket(
    `wss://3000-arnavk09-q17-kb2x2bgqgac.ws-us115.gitpod.io/channel?handle=${params.channel_id}`,
  );

  // message is received
  socket.addEventListener("message", (event) => {
    const data: ServrRes = JSON.parse(event.data.toString());
    if (data.avatar) setAvatar(data.avatar);
    if (data.id) setYTid(data.id);
    if (data.videos) setVideosCount(data.videos);
    if (data.views) setViews(data.views);
    if (data.subscribers) setSubscribers(data.subscribers);
    setSeries([
      {
        name: "subscribers",
        data: [data.subscribers, ...series[0].data],
      },
    ]);
  });

  socket.addEventListener("open", () => {
    setLoading(false);
  });

  socket.addEventListener("close", () => {
    // router.push('/')
  });

  socket.addEventListener("error", () => {
    // router.push(`/?error=Failed To Connect To Server`)
  });

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <section className="px-4 flex flex-col gap-10">
          <div>
            <div className="grid place-items-center">
              <img
                alt="logo"
                src={avatar}
                draggable={false}
                className="w-28 block mx-auto aspect-square my-10"
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
            <pre className="text-lg block mx-auto my-10">
              categories: {JSON.stringify(categories)}
              <br />
              series: {JSON.stringify(series[0].data)}
              <button onClick={() => categories.push("hi")}>hiii</button>
            </pre>

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
