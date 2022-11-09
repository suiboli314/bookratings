import "dotenv/config.js";
import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

import db from "./database/database.js";
import router from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app
  .use(logger("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser());

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

db.connect();
console.log(path.resolve(__dirname, "./fronend/build"));
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

// Register the application main router
app.use("/api", router);
//app.use("/user", userrouter);

export default app;
