import "dotenv/config.js";
import express from "express";
import session from "express-session";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

import router from "./api/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

let sess = {
  secret: "John Hate",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 0.5 * 60 * 60 * 1000 },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app
  .use(session(sess))
  .use(logger("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser());

app.use(express.static(path.resolve(__dirname, "./frontend/build")));

// Register the application main router
app.use("/api", router);

export default app;
