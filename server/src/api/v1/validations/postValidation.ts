import { IsNotEmpty, MinLength, validate } from "class-validator";
import ValidatorErrToFieldErr from "../helpers/ValidatorErrToFieldErr";
import { IPostInput } from "../interfaces/interfaces";

class PostValidation {
  @MinLength(5)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}

export default async (input: IPostInput) => {
  let fieldInput = new PostValidation();
  fieldInput.title = input.title;
  fieldInput.body = input.body;
  return await validate(fieldInput).then((errors) => {
    if (errors.length > 0) {
      return ValidatorErrToFieldErr(errors);
    } else {
      return;
    }
  });
};
