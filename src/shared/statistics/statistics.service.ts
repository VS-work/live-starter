import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LikeRequestObj } from './statistics.interface';

@Injectable()
export class StatisticsService {

  constructor(private http: Http) {
  }

  private setOptions(): RequestOptions {
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    });
  }

  setShowLike(rqstObg: LikeRequestObj): Observable<any> {
    return this.http.post('show-like', JSON.stringify(rqstObg),  this.setOptions())
      .map(res => {
        console.log('show Like: ', res);
        return res;
      }, (err: any) => {
        console.log(err);
      });
  }

  setArtistLike(rqstObg: LikeRequestObj): Observable<any> {
    return this.http.post('artist-like', JSON.stringify(rqstObg),  this.setOptions())
      .map(res => {
        console.log('artist Like: ', res);
        return res;
      }, (err: any) => {
        console.log(err);
      });
  }
}
