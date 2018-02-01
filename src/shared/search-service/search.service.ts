import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { Config } from '../../app.config';
import { Show } from '../../event-launch/event-launch.model';
import { ShowInfo } from '../show-info/info.interface';
import { User } from '../../signup/user.class';
import { Location } from '../../interfaces/country.interface';

export interface CustomResponse { // should be deleted after rework all methods
  success?: boolean;
  error?: string;
  err?: string;
  data: any;
}

@Injectable()
export class SearchService {
  userProfile: User;

  constructor(private http: HttpClient) {
    try {
      const profile = JSON.parse(localStorage.getItem('profile'));

      if (!profile) {
        this.userProfile = null;

        return undefined;
      }
      this.userProfile = new User(profile);
    } catch (err) {
      this.userProfile = null;
      console.error('something went wrong: ', err);
    }
  }

  getMusicStyles(): Observable<string[]> {
    return this.http.get(`${Config.api}/get-genres`)
      .catch(err => Observable.of(err));
  }

  getLocations(): Observable<Location> {
    return this.http.get(`${Config.api}/get-locations`)
      .catch(err => Observable.of(err));
  }

  getNonLiveEventsAmountData(): Observable<number> {
    return this.http.get(`${Config.api}/get-non-live-events-amount`)
      .catch(err => Observable.of(err));
  }

  getEventsList(query: {[key: string]: any}): Observable<Show[]> {
    const newQuery = {...query, userId: this.userProfile ? this.userProfile._id : ''};

    return this.http.get(`${Config.api}/get-events-list-by-query?${Config.objToQuery(newQuery)}`)
      .catch(err => Observable.of(err));
  }

  getUserFollowings(query: string): Observable<ShowInfo[]> {
    return this.http.get(`${Config.api}/get-user-followings?${query}`)
      .catch(err => Observable.of(err));
  }

  getArtistsList(query: string): Observable<CustomResponse> {  // need rework
    return this.http.get(`${Config.api}/get-artists-list?${query}`)
      .map((res: CustomResponse) => res)
      .catch(err => Observable.throw(err));
  }
}
