export class CreateUserDto {
  name: string;
  dateOfBirth: Date;
  status: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class GetUserDto {
  id: string;
}
