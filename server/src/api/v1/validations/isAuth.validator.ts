import { NextFunction, Request, Response } from "express";
import { httpCode } from "../common/http-code.enum";
import HttpExeception from "../common/http-exception";

export default async (req: Request, _: Response, next: NextFunction) => {
  console.log("isAuth");
  if (!req.session.user) {
    next(new HttpExeception({ statusCode: httpCode.NOT_AUTHORIZED }));
  } else {
    next();
  }
};
