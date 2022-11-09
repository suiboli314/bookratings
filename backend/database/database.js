import mongoose from "mongoose";

//const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const MONGO_URI = process.env.MONGO_URI;

function database() {
  const db = {};

  console.log(MONGO_URI);

  db.connect = () => {
    mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("connected to database successfully...");
      })
      .catch((error) => {
        console.log(
          "failed to connect to the database. terminating the application..."
        );
        console.error(error);
        process.exit(1);
      });
  };

  return db;
}

export default database();