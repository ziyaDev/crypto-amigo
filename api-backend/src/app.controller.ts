import { Controller, Post, Get, UseGuards, Req, Res } from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { Response, Request } from "express";
import { User } from "./users/entities/user.entity";
import { UsersService } from "./users/users.service";

interface CustomRequest extends Request {
  user: User;
}

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(
    @Req() req: CustomRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { access_token } = await this.authService.login(req.user);
    res
      .cookie("access_token", access_token, {
        httpOnly: true,
      })
      .send({ status: "ok" });
  }

  @UseGuards(JwtAuthGuard)
  @Get("/profile")
  async getProfile(@Req() req: CustomRequest): Promise<User> {
    const { id } = req.user;

    const user = await this.usersService.findUserById(id);

    const userWithPasswordOmitted = { ...user };
    delete userWithPasswordOmitted.password;

    return userWithPasswordOmitted;
  }

  @Get("/")
  home() {
    return "This is my amazing app";
  }
}
