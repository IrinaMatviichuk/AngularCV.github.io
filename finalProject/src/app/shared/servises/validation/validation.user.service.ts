import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UserService } from '../auth/user.service';
import { User } from '../../models/user';

@Injectable()
export class ValidationUserService {
  constructor(private userService: UserService) {
  }
  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((users: User[]) => {
          if (users[0]) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }
}
