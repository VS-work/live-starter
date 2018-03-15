import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Config } from '../app.config';
import { User } from '../user-service/user.model';


@Injectable()
export class EditProfileService {

  constructor(private http: HttpClient) {

  }

  getUser(query: any): Observable<User> {
    return this.http.get(`${Config.api}/edit-profile/get-user-data?email=${query}`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  editUser(query: any): Observable<any> {
    return this.http.post(`${Config.api}/edit-profile/edit-user-data`, query)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  editUserAvatar(query: any): Observable<any> {
    return this.http.post(`${Config.api}/edit-profile/edit-user-avatar`, query)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }
}
