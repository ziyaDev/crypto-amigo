import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

const VALID_ROLES = ["admin", "super-admin", "basic"];

@ValidatorConstraint({ name: "isValidRole", async: false })
export class IsValidRole implements ValidatorConstraintInterface {
  validate(role: string) {
    return VALID_ROLES.includes(role);
  }

  defaultMessage() {
    return `Role must be one of the following values: ${VALID_ROLES.join(
      ", ",
    )}`;
  }
}
