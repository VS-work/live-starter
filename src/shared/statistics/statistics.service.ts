import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';

import { LikeRequestObj } from './statistics.interface';
import { Config } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { CustomResponse } from './custom-responce.interface';

@Injectable()
export class StatisticsService {

  constructor(private http: HttpClient) {
  }

  setShowLike(rqstObg: LikeRequestObj): Observable<any> {
    return this.http.post(`${Config.api}/show-like`, JSON.stringify(rqstObg), Config.httpOptions)
      .map((res: CustomResponse) => res)
      .catch(err => Observable.throw(err));
  }

  setArtistLike(rqstObg: LikeRequestObj): Observable<any> {
    return this.http.post(`${Config.api}/artist-like`, JSON.stringify(rqstObg), Config.httpOptions)
      .map((res: CustomResponse) => res)
      .catch(err => Observable.throw(err));
  }
}
