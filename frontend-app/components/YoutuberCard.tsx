"use client";

import { Button, Card } from "pixel-retroui";

export default function YoutuberCard({channel_id}: {channel_id: string}) {
    return (
        <Card bg="#191818" shadowColor="#000" borderColor="#ff0000" className="cursor-pointer px-4 py-8 transition ease-in-out hover:scale-105 items-center flex flex-col">
            <img alt="logo" src="/logo.png" className="w-24 h-20"/>
            <h2 className="text-2xl font-bold mb-2 text-[#ff0000]">Youtuber Name</h2>
            <a href={`/channel/${channel_id}`}>
            <Button bg="#ff0000" shadow="#000" className="w-full">View Stats</Button>
            </a>
        </Card>
    )
}