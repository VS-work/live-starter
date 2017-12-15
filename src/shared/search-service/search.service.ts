import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';

import { Config } from '../../app.config';

import 'rxjs/add/operator/map';
import { LaunchEvent } from '../../event-launch/event-launch.interface';

@Injectable()
export class SearchService {
  public http: Http;

  public constructor(@Inject(Http) http: Http) {
    this.http = http;
  }

  public getMusicStyles(): Observable<any> {
    return this.http.get(`${Config.api}/music-styles`).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }

  public getLocations(): Observable<any> {

    return this.http.get(`${Config.api}/get-locations`).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }

  public getNonLiveEventsAmountData(): Observable<any> {
    return this.http.get(`${Config.api}/get-non-live-events-amount`).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }

  public getEventsList(query: string): Observable<any> {
    return this.http.get(`${Config.api}/get-events-list-by-query?${query}`).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }

  getMyEvents(query: string): Observable<LaunchEvent[]> {
    return this.http.get(`${Config.api}/get-my-events?${query}`)
      .map(res => res.json().data)
      .catch(err => Observable.throw(err));
  }

  getArtistsList(query: string): Observable<LaunchEvent[]> {
    return this.http.get(`${Config.api}/get-artists-list?${query}`)
      .map(res => res.json().data)
      .catch(err => Observable.throw(err));
  }
}
