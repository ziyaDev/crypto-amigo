export class CreateUserDto {
  name: string;
  date_of_birth: Date;
  status: string;
  roles: string[];
  created_at: Date;
  updated_at: Date;
}
