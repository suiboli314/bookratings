import { MongoClient } from 'mongodb'

function database() {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
    //const MONGO_URI = process.env.MONGO_URI;
    console.log("MONGO_URI: ", MONGO_URI);
  const client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
  client.connect()
  const db = client.db("test")
  return db;
}

export default database();
