"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "pixel-retroui";

export default function Navbar() {
  return (
    <Card
      bg="#ffbab5"
      textColor="black"
      shadowColor="#990931"
      borderColor="#400810"
      className="w-[90vw] saturate-200 text-center fixed top-5 z-30"
    >
      <div className="w-full flex justify-between items-center">
        <Link href="/" className="text-[#f01819] flex items-center text-lg">
          <Image
            className="mr-2 apect-square h-12 w-auto"
            alt="logo"
            src="/logo.png"
            width={1000}
            height={1000}
          />
        </Link>
        <div>
          <Link
            target="_blank"
            href="//github.com/ArnavK-09/youtube_live_stats"
          >
            <Button
              bg="#f01819"
              shadow="#990931"
              borderColor="#400810"
              textColor="white"
              className="flex align-middle"
            >
              ⭐ Star ⭐
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
