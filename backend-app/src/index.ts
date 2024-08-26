import Fluvio from "@fluvio/client";

interface YtData {
  avatar: string;
  handle: string;
  id: string;
  subscribers: number;
  videos: number;
  views: number;
}

const keyword = (handle: string) =>
  `yt-channel-updates-${handle.replaceAll(" ", "")}`;

const server = Bun.serve<{ handle: string }>({
  fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname === "/channel") {
      const success = server.upgrade(req, {
        data: { handle: url.searchParams.get("handle") ?? "youtube" },
      });
      return success
        ? undefined
        : new Response("WebSocket upgrade error", { status: 400 });
    }
    return new Response(
      JSON.stringify({
        time: new Date().toLocaleString(),
        message: "Hello, World!",
      }),
    );
  },
  websocket: {
    async open(ws) {
      ws.subscribe(keyword(ws.data.handle));

      const client = await Fluvio.connect();
      const consumer = await client.partitionConsumer("channel-data", 0);
      await consumer.stream({ index: 0 }, async (record: any) => {
        const eventData: YtData = JSON.parse(record.valueString());
        console.log(4343, ws.data, eventData);
        if (eventData.handle.toLowerCase() == ws.data.handle.toLowerCase()) {
          server.publish(keyword(ws.data.handle), JSON.stringify(eventData));
        }
      });

      // setInterval(() => {
      //   console.log(4);
      // }, 1000 * 5);
    },
    message() {},
    close(ws) {
      ws.unsubscribe(keyword(ws.data.handle));
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
