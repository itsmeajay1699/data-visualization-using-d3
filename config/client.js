import { MongoClient } from "mongodb";

export default async function client() {
  const client = new MongoClient(process.env.DB_URL, {});

  await client.connect();

  return client;
}
