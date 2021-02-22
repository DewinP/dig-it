import { ValidationError } from "class-validator";

export default (errors: ValidationError[]) => {
  return errors.map((e) => {
    let message = Object.values(e.constraints as object)[0];
    return { field: e.property, message };
  });
};
