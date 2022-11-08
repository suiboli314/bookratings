require("dotenv").config();
require("./database/database.js").connect();
const express = require("express");
const router = require("./routes/index");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
const cors = require('cors');

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send({ message: "Hello, nodemon!" });
});

// Import Routes

// Register the application main router
app.use("/api", router);
//app.use("/user", userrouter);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
