import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';

import { Config } from '../../app.config';
import { FollowResponse, FollowRqstObj } from './follow.interface';

@Injectable()
export class FollowService {

  constructor(private http: HttpClient) {

  }

  followUser(rqstObj: FollowRqstObj): Observable<FollowResponse> {
    return this.http.post(`${Config.api}/follow-user`, JSON.stringify(rqstObj), Config.httpOptions)
      .catch(err => Observable.throw(err));
  }

  checkFollowed(rqstObj: FollowRqstObj): Observable<FollowResponse> {
    return this.http.post(`${Config.api}/check-followed`, JSON.stringify(rqstObj), Config.httpOptions)
      .catch(err => Observable.throw(err));
  }
}
