import { UserContactBook } from './user-contactbook';

export class Contact {
  constructor(public user_id: number,
              public contact_book?: UserContactBook[],
              public id?: number) {}
}
