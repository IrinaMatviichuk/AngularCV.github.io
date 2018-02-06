import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { BaseApiService } from '../../core/base-api.service';

@Injectable()
export class UserService extends BaseApiService {
  constructor(public http: HttpClient) {
    super(http);
  }
  getUserByEmail(email: string): Observable<any> {
    return this.get(`login?email=${email}`);
  }
  login(email: string): Observable<any> {
    return this.get(`login?email=${email}`);
  }
  registration(user: User): Observable<any> {
    return this.post('login', user);
  }
}
