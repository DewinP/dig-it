import { DB_PASS, DB_USERNAME, DB_NAME } from "./constants";

import { ConnectionOptions } from "typeorm";
import {
  Comment,
  Community,
  Community_User,
  Post,
  User,
} from "../api/v1/models";

export default {
  type: "postgres",
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASS,
  logging: true,
  synchronize: true,
  entities: [User, Comment, Community, Community_User, Post],
} as ConnectionOptions;
