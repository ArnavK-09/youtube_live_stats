import Fluvio from "@fluvio/client";

(async () => {
  const client = await Fluvio.connect();
  const consumer = await client.partitionConsumer("channel-data", 0);
  await consumer.stream({ index: 0 }, async (record: any) => {
    const eventData = JSON.parse(record.valueString());
    console.log(eventData);
  });
})();
