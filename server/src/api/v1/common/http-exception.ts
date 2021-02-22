import { IFieldError } from "../interfaces/interfaces";
import { httpCode } from "./http-code.enum";

interface HttpExeceptionParams {
  statusCode: httpCode;
  errors?: IFieldError[];
  customErrMsg?: string;
}

export default class HttpExeception extends Error {
  statusCode: httpCode;
  errors?: IFieldError[];
  customErrMsg: string | undefined;
  constructor(params: HttpExeceptionParams) {
    super();
    this.statusCode = params.statusCode;
    this.errors = params.errors;
    this.customErrMsg = params.customErrMsg;
  }
}
