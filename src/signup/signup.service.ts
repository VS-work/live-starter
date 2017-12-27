import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/observable/throw'

import { Config } from '../app.config';
import { User } from './user.class';

@Injectable()
export class SignUpService {

  constructor(private http: HttpClient) {
  }

  signupUser(query: User): Observable<any> {
    return this.http.post(`${Config.api}/signup`, query);
  }

  isEmailExist(query: {email: string}): Observable<any> {
    return this.http.post(`${Config.api}/signup/check-email`, query);
  }

  signupGetLocations(): Observable<any> {
    return this.http.get(`${Config.api}/signup/get-locations`);
  }

  getUser(data: {email: string}): Observable<any> {
    const query = Config.objToQuery(data);

    return this.http.get(`${Config.api}/edit-profile/get-user-data?${query}`);
  }
}
