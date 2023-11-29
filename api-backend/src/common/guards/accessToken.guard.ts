import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

@Injectable()
export class AccessTokenGuard extends AuthGuard("jwt") {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException("Token expired!");
    } else if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException("Invalid Token!");
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
