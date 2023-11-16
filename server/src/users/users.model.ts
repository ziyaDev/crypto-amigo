class UserModel {
  id: string;
  name: string;
  date_of_birth: Date;
  status: string;
  roles: string[];
  created_at: Date;
  updated_at: Date;

  constructor(user: Partial<UserModel>) {
    this.id = Math.random().toString();
    this.name = user.name;
    this.date_of_birth = user.date_of_birth;
    this.status = user.status;
    this.roles = user.roles;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}

export default UserModel;
