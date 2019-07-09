export class User {
  id: number;
  name: string;
  email: string;
  username: string;
  basketId: number;

  constructor(id: number, name: string, email: string, username: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
  }
}
