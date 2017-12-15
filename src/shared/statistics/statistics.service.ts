import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';

import { LikeRequestObj } from './statistics.interface';
import { Config } from '../../app.config';

@Injectable()
export class StatisticsService {

  constructor(private http: Http) {
  }

  private getOptions(): RequestOptions {
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    });
  }

  setShowLike(rqstObg: LikeRequestObj): Observable<any> {
    return this.http.post(`${Config.api}/show-like`, JSON.stringify(rqstObg), this.getOptions())
      .map(res => {
        return res.json().data;
      })
      .catch(err => Observable.throw(err));
  }

  setArtistLike(rqstObg: LikeRequestObj): Observable<any> {
    return this.http.post(`${Config.api}/artist-like`, JSON.stringify(rqstObg), this.getOptions())
      .map(res => {
        return res.json().data;
      })
      .catch(err => Observable.throw(err));
  }
}
