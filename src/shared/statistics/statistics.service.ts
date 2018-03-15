import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

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
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  setArtistLike(rqstObg: LikeRequestObj): Observable<any> {
    return this.http.post(`${Config.api}/artist-like`, JSON.stringify(rqstObg), Config.httpOptions)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }
}
