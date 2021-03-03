import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { httpCode } from "../common/http-code.enum";
import HttpExeception from "../common/http-exception";
import ValidatorErrToFieldErr from "../helpers/ValidatorErrToFieldErr";
import { Post } from "../models";

export default async (req: Request, _: Response, next: NextFunction) => {
  let post = new Post();
  post.title = req.body.title;
  post.body = req.body.body;
  post.communityId = req.body.communityId;
  post.authorId = req.session.user!.id;

  let fieldErrors = await validate(post);
  if (fieldErrors.length > 0) {
    let errors = ValidatorErrToFieldErr(fieldErrors);
    next(new HttpExeception({ statusCode: httpCode.BAD_REQUEST, errors }));
  } else {
    next();
  }
};
