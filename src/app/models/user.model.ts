export class User {
  name: string;
  email: string;
  password: string;
  permissionLevel: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
}
}
