// import { IsNotEmpty, Matches, MinLength } from "class-validator";

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// export class LoginUserDto {
//   @IsNotEmpty()
//   @MinLength(3, { message: "Username must have atleast 3 characters." })
//   username: string;

//   @IsNotEmpty()
//   @Matches(passwordRegEx, {
//     message: `Password must contain Minimum 8 and maximum 20 characters,
//     at least one uppercase letter,
//     one lowercase letter,
//     one number and
//     one special character`,
//   })
//   password: string;
// }
