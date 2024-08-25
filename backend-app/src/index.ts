import Fluvio from "@fluvio/client";
import { Hono } from "hono";

const app = new Hono(); 


app.get('/', (c) => {
  return c.json({
    time: new Date().toLocaleString(),
    message: 'Hello, World!',
  })
})

app.get("/channel/:handle", async (c) => {
  const channelIDs: any[] = [];
  try {
    const fluvio = await Fluvio.connect();
    const admin = await fluvio.admin();
    const result = JSON.parse(await admin.listPartitions());
    const producer = await fluvio.topicProducer("channel-handle");

    // Send a new topic record
    const x = await producer.sendRecord(c.req.param('handle') ?? "Youtube", 0);
    result.forEach((x: { name: string }) => channelIDs.push(x));
  } catch (e) {
    console.log(e);
  }
  return c.json(channelIDs);
});

export default app;
