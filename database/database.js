import { MongoClient } from "mongodb";

function database() {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
  const DB_NAME = "test";

  const db = {};

  db.collection = async (COLLECTION_NAME) => {
    try {
      const client = new MongoClient(MONGO_URI);
      await client.connect();

      const db = client.db(DB_NAME);
      return [client, db.collection(COLLECTION_NAME)];
    } catch (e) {
      const error = `connect to ${MONGO_URI}.${DB_NAME}.${COLLECTION_NAME} collection error: ${e} `;
      console.log(error);
      throw e;
    }
  };

  return db;
}

export default database();
