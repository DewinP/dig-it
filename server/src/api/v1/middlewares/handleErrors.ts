import { Request, Response, NextFunction } from "express";
import { httpCode } from "../common/http-code.enum";
import HttpExeception from "../common/http-exception";

const handleErrors = (
  err: HttpExeception,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.statusCode || 500;
  const errors = err.errors;
  let message = err.customErrMsg;
  switch (status) {
    case httpCode.BAD_REQUEST:
      res.status(status).json(errors);
      break;
    case httpCode.NOT_AUTHORIZED:
      res.sendStatus(httpCode.NOT_AUTHORIZED);
      break;
    case httpCode.NOT_FOUND:
      res.status(status).json({ message });
      break;
    default:
      res
        .status(status)
        .json({ errorMessage: "Sorry we are currently having some problems" });
  }
};

export default handleErrors;
