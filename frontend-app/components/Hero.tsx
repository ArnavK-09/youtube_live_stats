"use client";

import { useRouter } from "next/navigation";
import { Input } from "pixel-retroui";
import { useState } from "react";

export default function Hero() {
  const [userQuery, setUserQuery] = useState<string>("youtube");
  const router = useRouter();

  const goToPage = () => {
    if (userQuery.length == 0) return;
    router.push(`/channel/${userQuery}`);
  };
  return (
    <>
      <div className="w-auto mx-auto block">
        <h1 className="my-14 text-5xl md:text-7xl text-[#400810] tracking-wide font-extrabold">
          Realtime
          <br />
          <strong className="text-white bg-gradient-to-br from-[#f01819] to-red-600 opacity-95 my-2 rotate-1">
            Youtubers
          </strong>
          <br />
          Statistics!
        </h1>
        <Input
          className="w-[70vw] placeholder:text-[#990931] md:py-4 text-sm md:text-2xl md:font-semibld md:[&>button]:h-full md:[&>button>img]:h-full md:[&>button>img]:w-full"
          textColor="#630010"
          bg="#ffbab5"
          value={userQuery}
          onIconClick={() => goToPage()}
          spellCheck="false"
          borderColor="#630010"
          icon="/logo.png"
          onChange={(e) =>
            setUserQuery(e.target.value.trim().replaceAll("@", ""))
          }
        />
      </div>
    </>
  );
}
