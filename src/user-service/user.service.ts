import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { Config } from '../app.config';
import { ParsedProfile } from '../auth0/parsed-profile.interface';
import { User } from './user.model';
import { UpdateUserProfileRequestObject, UpdateUserProfileResponseObject } from './update-user-profile.interface';

export interface GetUserData {
  email?: string;
  _id?: string;
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  signupUser(query: ParsedProfile): Observable<any> {
    return this.http.post(`${Config.api}/signup`, query, Config.httpOptions)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }

  isEmailExist(query: {email: string}): Observable<any> {
    return this.http.post(`${Config.api}/signup/check-email`, query, Config.httpOptions)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }

  getUser(data: GetUserData): Observable<any> {
    const query = Config.objToQuery(data);
    return this.http.get(`${Config.api}/edit-profile/get-user-data?${query}`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }

  updateUser(data: UpdateUserProfileRequestObject): Observable<UpdateUserProfileResponseObject> {
    return this.http.put(`${Config.api}/update-user-profile`, data, Config.httpOptions)
      .pipe(catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  updateUserNotifications(data: UpdateUserProfileRequestObject): Observable<UpdateUserProfileResponseObject> {
    return this.http.put(`${Config.api}/update-user-notifications`, data, Config.httpOptions)
      .pipe(catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  getUserFromLocalStorage(): User {
    try {
      const currentUserProfile = JSON.parse(localStorage.getItem('profile'));

      if (!currentUserProfile) {
        return null;
      }

      return new User(currentUserProfile);
    } catch (err) {
      console.error('something went wrong: ', err);
      return null;
    }
  }

  setUserToLocalStorage(profile: User): void {
    localStorage.setItem('profile', JSON.stringify(profile));
  }
}
