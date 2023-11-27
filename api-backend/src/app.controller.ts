import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() {}

  @Get("/")
  home() {
    return "This is my amazing app";
  }
}
