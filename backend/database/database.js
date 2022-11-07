const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
console.log(MONGO_URI)
exports.connect = () => {
  mongoose
    .connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
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
