import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates an account for a user.
   * @param createUserDto The data transfer object for creating a user.
   * @param hashedPassword The hashed password derived from the inputted user password.
   * @returns A user object.
   */
  async createUser(
    createUserDto: CreateUserDto,
    hashedPassword: string,
  ): Promise<User> {
    const user: User = new User();

    Object.assign(user, createUserDto);
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  /**
   * Finds all users in the database.
   * @returns An array of users.
   */
  async findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Finds a single user in the database using a user id.
   * @returns A user object.
   */
  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * Finds a single user in the database using a user username.
   * @returns A user object.
   */
  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  /**
   * Updates an account for a user.
   * @param id The id of the user.
   * @param updateUserDto The data transfer object for updating a user.
   * @returns A user object.
   */
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  /**
   * Deletes a single user in the database using a user id.
   * @returns A message.
   */
  async deleteUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
