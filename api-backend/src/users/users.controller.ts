import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dtos";

// This controller will manage localhost:8080/users
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Manages all POST requests to /users
  @Post()
  addUser(@Body() completeBody: CreateUserDto): any {
    return this.usersService.insertUser(completeBody);
  }

  // Manages all GET requests to /users
  @Get()
  getAllUsers(): any {
    return this.usersService.getUsers();
  }

  // Manages all GET requests to /users/:id
  @Get(":id")
  getUser(@Param("id") userId: string): any {
    return this.usersService.getUser(userId);
  }

  // Manages all PATCH requests to /users/:id
  @Patch(":id")
  updateUser(@Param("id") userId: string, completeBody: UpdateUserDto): any {
    return this.usersService.updateUser(userId, completeBody);
  }
}
