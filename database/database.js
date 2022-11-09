import mongoose from "mongoose";

function database() {
  const db = {};

  db.connect = () => {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
    console.log("MONGO_URI: ", MONGO_URI);
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
