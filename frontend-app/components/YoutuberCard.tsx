"use client";

import Link from "next/link";
import { Button, Card } from "pixel-retroui";

export default function YoutuberCard({ channel_id }: { channel_id: string }) {
  return (
    <Card
      bg="#ffbab5"
      shadowColor="#990931"
      borderColor="#400810"
      className="cursor-pointer px-4 py-8 transition ease-in-out hover:scale-105 items-center flex flex-col"
    >
      <img draggable={false} alt="logo" src="/logo.png" className="w-24 h-20" />
      <h2 className="text-2xl uppercase font-extrabold mb-2 text-[#f01819]">
        @{channel_id}
      </h2>
      <Link href={`/channel/${channel_id}`}>
        <Button
          textColor="white"
          bg="#f01819"
          shadow="#990931"
          borderColor="#400810"
          className="w-full text-[white]"
        >
          View Stats
        </Button>
      </Link>
    </Card>
  );
}
