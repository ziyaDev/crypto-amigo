import { Injectable, NotFoundException } from "@nestjs/common";
import UserModel from "./users.model";
import { CreateUserDto } from "./dtos";

@Injectable()
export class UsersService {
  private users: UserModel[] = [];

  insertUser(userData: Partial<CreateUserDto>): any {
    const newUser = new UserModel(userData);
    this.users.push(newUser);
    return { id: newUser.id };
  }

  getUsers(): Array<UserModel> {
    return [...this.users];
  }

  getUser(id: string): UserModel {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      return { ...this.users.find((user) => user.id === id) };
    } else {
      throw new NotFoundException();
    }
  }
}
