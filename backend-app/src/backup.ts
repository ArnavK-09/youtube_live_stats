import Fluvio from "@fluvio/client";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";

const { upgradeWebSocket, websocket } = createBunWebSocket();
const app = new Hono();

app.get("/", (c) => {
  return c.json({
    time: new Date().toLocaleString(),
    message: "Hello, World!",
  });
});

app.get(
  "/channel/:handle",
  upgradeWebSocket((c) => {
    return {
      onOpen() {
        setInterval(() => {
          console.log(43434, "interval passing");
        }, 1000 * 5);
      },
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send("Hello from server!");
      },
      onClose: () => {
        console.log("Connection closed");
      },
    };
  }),
);

app.get("/stream/:handle", async (c) => {
  const handle = c.req.param("handle") ?? "youtube";
});

app.get("/channels", async (c) => {
  const channelIDs: any[] = [];
  try {
    const fluvio = await Fluvio.connect();
    const admin = await fluvio.admin();
    const result = JSON.parse(await admin.listPartitions());
    const producer = await fluvio.topicProducer("channel-handle");

    // Send a new topic record
    const x = await producer.sendRecord(c.req.param("handle") ?? "Youtube", 0);
    result.forEach((x: { name: string }) => channelIDs.push(x));
  } catch (e) {
    console.log(e);
  }
  return c.json(channelIDs);
});

export default app;
