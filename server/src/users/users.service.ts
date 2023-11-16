import { Injectable } from '@nestjs/common';
import UserModel from './users.model';
import { CreateUserDto } from './dtos';

@Injectable()
export class UsersService {
  users: UserModel[] = [];

  insertUser(userData: Partial<CreateUserDto>): UserModel {
    const newUser = new UserModel(userData);
    this.users.push(newUser);
    return newUser;
  }
}
