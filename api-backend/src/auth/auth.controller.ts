import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  Body,
  Patch,
  Get,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { LocalAuthGuard } from "../common/guards/localAuth.guard";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { RefreshTokenGuard } from "src/common/guards/refreshToken.guard";
import { User } from "src/users/entities/user.entity";

interface CustomRequest extends Request {
  user: any;
}

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async loginExistingUser(
    @Req() req: CustomRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return { message: "Logged in successfully" };
  }

  @UseGuards(AccessTokenGuard)
  @Patch("logout")
  async logout(
    @Req() req: CustomRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    res.cookie("accessToken", "", { httpOnly: true, expires: new Date(0) });
    res.cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) });

    await this.authService.logout(req.user.id);
    return { message: "Logged out successfully" };
  }

  @UseGuards(AccessTokenGuard)
  @Get("profile")
  async getProfile(@Req() req: CustomRequest): Promise<User> {
    const user = await this.usersService.findUserById(req.user.id);

    const userWithSensitiveDataRemoved = { ...user };
    delete userWithSensitiveDataRemoved.password;
    delete userWithSensitiveDataRemoved.refreshToken;

    return userWithSensitiveDataRemoved;
  }

  @UseGuards(RefreshTokenGuard)
  @Patch("refresh")
  async refreshTokens(@Req() req: CustomRequest): Promise<{ message: string }> {
    const userId = req.user.id;
    const refreshToken = req.user.refreshToken;

    await this.authService.refreshTokens(userId, refreshToken);
    return { message: "Tokens refreshed successfully" };
  }

  @Post("signup")
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const { accessToken, refreshToken } =
      await this.authService.signUp(createUserDto);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return { message: "Created account successfully" };
  }

  @UseGuards(AccessTokenGuard)
  @Get("validate")
  async validateToken(@Req() req: CustomRequest): Promise<{
    message: string;
    userId: number;
  }> {
    return {
      message: "User is authenticated",
      userId: req.user.id,
    };
  }
}
