import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  IsArray,
  Validate,
  IsOptional,
} from "class-validator";
import { IsValidRole } from "../validators/is-valid-role.validator";

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: "Name must have atleast 2 characters." })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(3, { message: "Username must have atleast 3 characters." })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsInt()
  age: number;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

  @IsString()
  @IsEnum(["active", "inactive", "deleted", "banned"])
  status: string;

  @IsArray()
  @IsString({ each: true })
  @Validate(IsValidRole, { each: true })
  roles: string[];

  @IsString()
  @IsOptional()
  refreshToken: string | null;
}
