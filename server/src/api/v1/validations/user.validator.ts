import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { httpCode } from "../common/http-code.enum";
import HttpExeception from "../common/http-exception";
import ValidatorErrToFieldErr from "../helpers/ValidatorErrToFieldErr";
import { User } from "../models";

export default async (req: Request, _: Response, next: NextFunction) => {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  let fieldErrors = await validate(user);
  if (fieldErrors.length > 0) {
    let errors = ValidatorErrToFieldErr(fieldErrors);
    next(new HttpExeception({ statusCode: httpCode.BAD_REQUEST, errors }));
  } else {
    next();
  }
};
