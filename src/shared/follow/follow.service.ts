import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Config } from '../../app.config';
import { FollowResponse, FollowRqstObj } from './follow.interface';

@Injectable()
export class FollowService {

  constructor(private http: HttpClient) {

  }

  followUser(rqstObj: FollowRqstObj): Observable<FollowResponse> {
    return this.http.post(`${Config.api}/follow-user`, JSON.stringify(rqstObj), Config.httpOptions)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  checkFollowed(rqstObj: FollowRqstObj): Observable<FollowResponse> {
    return this.http.post(`${Config.api}/check-followed`, JSON.stringify(rqstObj), Config.httpOptions)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }
}
