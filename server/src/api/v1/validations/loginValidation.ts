import { IsNotEmpty, validate } from "class-validator";
import ValidatorErrToFieldErr from "../helpers/ValidatorErrToFieldErr";
import { ILoginInput } from "../interfaces/interfaces";

class LoginValidation {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export default async (input: ILoginInput) => {
  let fieldInput = new LoginValidation();
  fieldInput.username = input.username;
  fieldInput.password = input.password;
  return await validate(fieldInput).then((errors) => {
    if (errors.length > 0) {
      return ValidatorErrToFieldErr(errors);
    } else {
      return;
    }
  });
};
