import { validate } from "class-validator";
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
} from "class-validator";
import ValidatorErrToFieldErr from "../helpers/ValidatorErrToFieldErr";
import { IRegisterInput } from "../interfaces/interfaces";

class RegisterValidation {
  @MaxLength(20)
  @MinLength(3)
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @MinLength(4)
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export default async (input: IRegisterInput) => {
  let fieldInput = new RegisterValidation();
  fieldInput.email = input.email;
  fieldInput.password = input.password;
  fieldInput.username = input.username;
  return validate(fieldInput).then((errors) => {
    if (errors.length > 0) {
      return ValidatorErrToFieldErr(errors);
    } else {
      return;
    }
  });
};
