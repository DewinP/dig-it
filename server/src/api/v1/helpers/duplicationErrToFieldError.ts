import { IFieldError } from "../interfaces/interfaces";

const duplicationErrToFieldError = (str: string): IFieldError[] => {
  let regExp = /\((.*?)\)/g;
  let matches = regExp.exec(str) as string[];

  return [
    {
      field: matches[1],
      message: `${matches[1]} is already taken`,
    },
  ];
};

export default duplicationErrToFieldError;
