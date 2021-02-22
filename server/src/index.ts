import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import DatabaseConfig from "./config/DatabaseConfig";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  COOKIE_NAME,
  CORS_ORIGIN,
  PORT,
  SESSION_SECRET,
} from "./config/constants";
import bodyParser from "body-parser";
import apiRoutes from "./api/v1/routes/index";
import session from "express-session";
import handleErrors from "./api/v1/middlewares/handleErrors";
import { notFoundHandler } from "./api/v1/middlewares/notFoundError";

const main = async () => {
  dotenv.config();
  await createConnection(DatabaseConfig);
  const app = express();
  app
    .use(morgan("dev"))
    .use(
      cors({
        origin: CORS_ORIGIN,
        credentials: true,
      })
    )
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(
      session({
        name: COOKIE_NAME,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          sameSite: "lax",
        },
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
      })
    );
  app.use("/api", apiRoutes);
  app.use(handleErrors);
  app.use(notFoundHandler);
  app.listen(PORT, () => {
    console.log(`server running in port: https://localhost:${PORT}`);
  });
};

main().then((e) => {
  console.log(e);
});
