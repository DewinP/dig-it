import { IFieldError } from "../interfaces/interfaces";
export const toErrorMap = (errors: IFieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
