import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
// import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);

    if (!user) {
      return null;
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    if (!isMatch) {
      throw new UnauthorizedException("Password is incorrect");
    }

    const userWithPasswordOmitted = { ...user };
    delete userWithPasswordOmitted.password;

    return userWithPasswordOmitted;
  }

  async login(user: User): Promise<any> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
