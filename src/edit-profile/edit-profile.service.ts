import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/observable/throw'

import { Config } from '../app.config';
import { User } from '../user-service/user.model';


@Injectable()
export class EditProfileService {

  constructor(private http: HttpClient) {

  }

  getUser(query: any): Observable<User> {
    return this.http.get(`${Config.api}/edit-profile/get-user-data?email=${query}`)
      .catch(err => Observable.throw(err));
  }

  editUser(query: any): Observable<any> {
    return this.http.post(`${Config.api}/edit-profile/edit-user-data`, query)
      .catch(err => Observable.throw(err));
  }

  editUserAvatar(query: any): Observable<any> {
    return this.http.post(`${Config.api}/edit-profile/edit-user-avatar`, query)
      .catch(err => Observable.throw(err));
  }
}
