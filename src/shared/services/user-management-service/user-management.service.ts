import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { Config } from '../../../app.config';
import { ParsedProfile } from '../../../auth0/parsed-profile.interface';
import { Notifications } from '../../../my-profile/notification.model';
import { User, UpdateUserProfileRequestObject, UpdateUserProfileResponseObject } from './';
import { ShowInfo } from '../../show-info/info.interface';
import { Show } from '../show-management-service/show.model';

export interface GetUserData {
  email?: string;
  _id?: string;
}

@Injectable()
export class UserManagementService {
  updateUserAccount: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  signupUser(query: ParsedProfile): Observable<any> {
    return this.http.post(`${Config.api}/signup`, query, Config.httpOptions)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }

  isEmailExist(query: { email: string }): Observable<any> {
    return this.http.post(`${Config.api}/signup/check-email`, query, Config.httpOptions)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }

  getUser(data: GetUserData): Observable<User> {
    const query = Config.objToQuery(data);

    return this.http.get(`${Config.api}/edit-profile/get-user-data?${query}`)
      .pipe(
        map(user => new User(user)),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        }));
  }

  getUsersNotifications(userId: string): Observable<Notifications> {
    const query = Config.objToQuery({userId});

    return this.http.get(`${Config.api}/get-user-notifications?${query}`)
      .pipe(
        map((res: Notifications) => new Notifications(res)),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        }));
  }

  getUserFollowings(query: string): Observable<ShowInfo[]> {
    return this.http.get(`${Config.api}/get-user-followings?${query}`)
      .pipe(
        map((res: ShowInfo[]) => {
          return res.map((following: ShowInfo) => {
            return {
              user: new User(following.user),
              show: new Show(following.show),
              isEvent: false
            };
          });
        }),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        }));
  }

  getUsersAmount(query: string): Observable<number> {
    return this.http.get(`${Config.api}/get-users-amount?${query}`)
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

  setUserToLocalStorage(profile: User, isEmitUpdateUserAccount = false): void {
    localStorage.setItem('profile', JSON.stringify(profile));

    if (isEmitUpdateUserAccount) {
      this.updateUserAccount.emit(true);
    }
  }
}
