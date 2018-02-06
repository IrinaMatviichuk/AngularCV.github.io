export class User {
  constructor(public email: string,
              public password: string,
              public username?: string,
              public usersurname?: string,
              public role?: string,
              public id?: number) {}
}
