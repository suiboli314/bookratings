import 'dotenv/config.js';
import express from "express";
import db from "./database/database.js";
import router from "./routes/index.js";

db.connect();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// const corsOptions = {
//   origin: (origin, callback) => {
//     callback(null, true);
//   },
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
//   credentials: true
// };

// app.options('*', cors(corsOptions));
// app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send({ message: "Hello, nodemon!" });
});

// Register the application main router
app.use("/api", router);
//app.use("/user", userrouter);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
