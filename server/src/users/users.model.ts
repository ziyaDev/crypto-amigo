class UserModel {
  id: string;
  name: string;
  dateOfBirth: Date;
  status: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Partial<UserModel>) {
    this.id = crypto.randomUUID().toString();
    this.name = user.name;
    this.dateOfBirth = user.dateOfBirth;
    this.status = user.status;
    this.roles = user.roles;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export default UserModel;
