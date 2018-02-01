import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/observable/throw'

import { Config } from '../app.config';
import { User } from './user.class';

interface GetUserData {
  email?: string;
  _id?: string;
}

@Injectable()
export class SignUpService {

  constructor(private http: HttpClient) {
  }

  signupUser(query: User): Observable<any> {
    return this.http.post(`${Config.api}/signup`, query)
      .catch(err => Observable.throw(err));
  }

  isEmailExist(query: {email: string}): Observable<any> {
    return this.http.post(`${Config.api}/signup/check-email`, query)
      .catch(err => Observable.throw(err));
  }

  signupGetLocations(): Observable<any> {
    return this.http.get(`${Config.api}/signup/get-locations`)
      .catch(err => Observable.throw(err));
  }

  getUser(data: GetUserData): Observable<any> {
    const query = Config.objToQuery(data);

    return this.http.get(`${Config.api}/edit-profile/get-user-data?${query}`)
      .catch(err => Observable.throw(err));
  }
}
