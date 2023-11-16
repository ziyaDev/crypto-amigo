import { Injectable, NotFoundException } from "@nestjs/common";
import UserModel from "./users.model";
import { CreateUserDto, UpdateUserDto } from "./dtos";

@Injectable()
export class UsersService {
  private users: UserModel[] = [];

  insertUser(userData: Partial<CreateUserDto>): { id: string } {
    const newUser = new UserModel(userData);
    this.users.push(newUser);
    return { id: newUser.id };
  }

  getUsers(): UserModel[] {
    return [...this.users];
  }

  getUser(id: string): UserModel {
    const [user] = this.findUser(id);

    if (user) {
      return { ...user };
    } else {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  updateUser(id: string, userData: Partial<UpdateUserDto>): UserModel {
    const [user, index] = this.findUser(id);

    if (user) {
      this.users[index] = { ...user, ...userData };
      return this.users[index];
    } else {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  private findUser(id: string): [UserModel, number] {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];

    if (user) {
      return [user, userIndex];
    } else {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
