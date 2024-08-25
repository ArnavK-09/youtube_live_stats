import React from "react";
import YoutuberCard from "./YoutuberCard";

const getListOfConfiguredChannels = async () => {
  const data = await fetch("http://localhost:8080/list")
    .then(async (e) => await e.json())
    .catch(() => ["null"]);
  console.log(data, 3);
  return data;
};

export default async function YoutubersList() {
  const channels: string[] = await getListOfConfiguredChannels();

  return (
    <section className="w-full my-20 grid place-items-center">
      <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map((channel) => (
          <YoutuberCard key={channel} channel_id={`${channel}`} />
        ))}
      </div>
    </section>
  );
}