import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req): any {
    return req.user;
  }
}
