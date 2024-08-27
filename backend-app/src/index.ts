import Fluvio from "@fluvio/client";

interface YtData {
  avatar: string;
  handle: string;
  id: string;
  subscribers: number;
  videos: number;
  views: number;
}

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const YOUTUBE_CHANNELS: string[] = `mrbeast,king,youtube,cristiano`.split(",");

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
    if (url.pathname == "/channels") {
      return new Response(JSON.stringify(shuffleArray(YOUTUBE_CHANNELS)));
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
        
        if (eventData.handle.toLowerCase() == ws.data.handle.toLowerCase()) {
          server.publish(keyword(ws.data.handle), JSON.stringify(eventData));
        }
      });

      setInterval(async () => {
        const producer = await client.topicProducer("channel-handle");
        producer.sendRecord(ws.data.handle, 0);
      }, 1000 * 15);
    },
    message() {},
    close(ws) {
      ws.unsubscribe(keyword(ws.data.handle));
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
