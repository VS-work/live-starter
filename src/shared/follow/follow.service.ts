import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';

import { Config } from '../../app.config';
import { FollowRqstObj } from './follow.interface';


@Injectable()
export class FollowService {

  constructor(private http: HttpClient) {
  }

  followUser(rqstObj: FollowRqstObj): Observable<string> {
    return this.http.post(`${Config.api}/follow-user`, JSON.stringify(rqstObj), Config.httpOptions)
      .map(res => {
        return res;
      })
      .catch(err => Observable.throw(err));
  }
}
