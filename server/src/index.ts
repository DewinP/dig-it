import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import DatabaseConfig from "./config/DatabaseConfig";
import express from "express";
import morgan from "morgan";
import { COOKIE_NAME, PORT, SESSION_SECRET } from "./config/constants";
import apiRoutes from "./api/v1/routes/index";
import session from "express-session";
import handleErrors from "./api/v1/middlewares/handleErrors";
import { notFoundHandler } from "./api/v1/middlewares/notFoundError";
import Redis from "ioredis";
import connectRedis from "connect-redis";

const main = async () => {
  dotenv.config();
  await createConnection(DatabaseConfig);
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.set("trust proxy", 1);
  app
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(
      session({
        name: COOKIE_NAME,
        store: new RedisStore({
          client: redis,
          disableTouch: true,
          logErrors: true,
        }),
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
          secure: true,
          maxAge: 1000 * 60 * 60 * 24,
          sameSite: "lax",
          httpOnly: true,
        },
      })
    );
  app.use("/api", apiRoutes);
  app.use(handleErrors);
  app.use(notFoundHandler);
  app.listen(PORT, () => {
    console.log(`server running in port: http://localhost:${PORT}`);
  });
};

main().then((e) => {
  console.log(e);
});
