import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "src/users/dto/create-user.dto";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Enables users to refresh their tokens (access and refresh).
   * @param userId The id of the user attempting to refresh their tokens.
   * @param currentRefreshToken The refresh token the user currently has associated to their account.
   * @returns An object containing new accessToken and refreshToken for the user.
   */
  async refreshTokens(userId: number, currentRefreshToken: string) {
    const user = await this.usersService.findUserById(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException(
        "Access Denied No User Or Incorrect Refresh Token",
      );
    }
    const refreshTokenMatches = await this.comparePlainValueToHashedValue(
      currentRefreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException("Access Denied Refresh Token Is Invalid");
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(user, "access-token"),
      this.generateToken(user, "refresh-token"),
    ]);

    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  /**
   * Creates an account for a user and returns access and refresh tokens.
   * @param createUserDto The data transfer object for creating a user.
   * @returns An object containing the accessToken and refreshToken.
   */
  async signUp(createUserDto: CreateUserDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const userExists = await this.usersService.findByUsername(
      createUserDto.username,
    );

    if (userExists) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.createUser(
      createUserDto,
      hashedPassword,
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(newUser, "access-token"),
      this.generateToken(newUser, "refresh-token"),
    ]);

    await this.updateRefreshToken(newUser.id, refreshToken);
    return { accessToken, refreshToken };
  }

  /**
   * Validates the login credentials of an existing user.
   * @param username The username of the user.
   * @param password The password of the user.
   * @returns The user object without the password.
   */
  async validateExistingUserLoginDetails(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(
        `User with username ${username} does not exist`,
      );
    }

    const passwordMatches = await this.comparePlainValueToHashedValue(
      password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException("Incorrect password");
    }

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  /**
   * Logs in a user and returns access and refresh tokens.
   * @param user The user object.
   * @returns An object containing the accessToken and refreshToken.
   */
  async login(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(user, "access-token"),
      this.generateToken(user, "refresh-token"),
    ]);

    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  /**
   * Logs out a user by nullifying their refresh token.
   * @param userId The id of the user.
   * @returns The result of the user update operation.
   */
  async logout(userId: number): Promise<User> {
    return this.usersService.updateUser(userId, { refreshToken: null });
  }

  /**
   * Verifies the validity of a given JWT token.
   * @param token The token to be verified.
   * @returns The decoded token if valid, or throws an exception if invalid.
   */
  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  /**
   * Updates the refresh token for a user in the database.
   * @param userId The ID of the user.
   * @param refreshToken The new refresh token.
   */
  private async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  // ==== Private Methods ====

  /**
   * Hashes the given data.
   * @param data The data to be hashed.
   * @returns The hashed data.
   */
  private async hashData(data: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(data, saltOrRounds);
  }

  /**
   * Compares a plaintext value with a hashed value.
   * @param plainTextValue The plaintext value.
   * @param hashedValue The hashed value.
   * @returns True if the both values match, false otherwise.
   */
  private async comparePlainValueToHashedValue(
    plainTextValue: string,
    hashedValue: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextValue, hashedValue);
  }

  /**
   * Generates a JWT token for a user.
   * @param user The user object.
   * @param tokenType The type of token -- can be one of "access-token" or "refresh-token".
   * @returns A signed JWT token.
   */
  private async generateToken(
    user: User,
    tokenType: "access-token" | "refresh-token",
  ): Promise<string> {
    if (tokenType === "access-token") {
      return this.jwtService.signAsync(
        { sub: user.id, username: user.username },
        {
          secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
          expiresIn: "30m",
        },
      );
    }

    if (tokenType === "refresh-token") {
      return this.jwtService.signAsync(
        { sub: user.id, username: user.username },
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: "7d",
        },
      );
    }
  }
}
