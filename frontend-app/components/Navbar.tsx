"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "pixel-retroui";

export default function Navbar() {
  return (
    <Card
      bg="#191818"
      textColor="black"
      borderColor="black"
      shadowColor="#FF0000"
      className="w-[90vw] saturate-200 text-center fixed top-5 z-30"
    >
      <div className="w-full flex justify-between items-center">
        <Link href="/" className="text-[#FF0000] flex items-center text-lg">
          <Image
            className="mr-2 apect-square h-12 w-auto"
            alt="logo"
            src="/logo.png"
            width={1000}
            height={1000}
          />
          <strong>Youtube Live</strong>
        </Link>
        <div>
          <Link target="_blank" href="//github.com/ArnavK-09/chapters_as_tasks">
            <Button
              bg="#FF0000"
              textColor="black"
              shadow="#000"
              borderColor="#000"
              className="flex align-middle"
            >
              <Image
                unoptimized
                alt="star"
                width={24}
                height={24}
                src="/emojigg/bow.gif"
                className="mr-2 apect-square h-6 w-6"
              />
              Give A Star!
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}