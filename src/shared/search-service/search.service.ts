import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { Config } from '../../app.config';
import { Show } from '../../event-launch/event-launch.model';

export interface CustomResponse { // should be deleted after rework all methods
  success?: boolean;
  error?: string;
  err?: string;
  data: any;
}

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {

  }

  getMusicStyles(): Observable<CustomResponse> { // need rework
    return this.http.get(`${Config.api}/music-styles`)
      .map((res: CustomResponse) => res)
      .catch(err => Observable.of(err));
  }

  getLocations(): Observable<CustomResponse> { // need rework

    return this.http.get(`${Config.api}/get-locations`)
      .map((res: CustomResponse) => {
        return {err: res.error, data: res.data};
      })
      .catch(err => Observable.of(err));
  }

  getNonLiveEventsAmountData(): Observable<number> {
    return this.http.get(`${Config.api}/get-non-live-events-amount`)
      .map(res => res)
      .catch(err => Observable.of(err));
  }

  getEventsList(query: string): Observable<Show[]> {
    return this.http.get(`${Config.api}/get-events-list-by-query?${query}`)
      .map(res => res)
      .catch(err => Observable.of(err));
  }

  getMyEvents(query: string): Observable<Show[]> {  // need rework, should be comишту with getEventsList
    return this.http.get(`${Config.api}/get-my-events?${query}`)
      .map(res => res)
      .catch(err => Observable.throw(err));
  }

  getArtistsList(query: string): Observable<CustomResponse> {
    return this.http.get(`${Config.api}/get-artists-list?${query}`)
      .map((res: CustomResponse) => res)
      .catch(err => Observable.throw(err));
  }
}
