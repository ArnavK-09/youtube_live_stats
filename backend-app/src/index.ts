import Fluvio from '@fluvio/client';
import { Hono } from 'hono'

const app = new Hono()

app.get('/channels', async (c) => {
  const channelIDs: string[] = [];
  try {
    const fluvio = await Fluvio.connect();
    const admin = await fluvio.admin();
    const result = JSON.parse(await admin.listTopic());
    const producer = await fluvio.topicProducer("channel-id");

    // Send a new topic record
    producer.sendRecord("stringified data", 0)
    result.forEach((x: { name: string }) => channelIDs.push(x.name))
  } catch (e) {
    console.log(e)
  }
  return c.json(channelIDs);
})

export default app
