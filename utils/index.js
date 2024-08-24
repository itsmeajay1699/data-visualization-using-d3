import client from "../config/client.js";
export const giveCollection = async (collectionName) => {
  try {
    const clientConnect = await client();
    const db = clientConnect.db("RQ_Analytics");
    const collection = db.collection(collectionName);
    return collection;
  } catch (err) {
    console.log(err.message);
  }
};
