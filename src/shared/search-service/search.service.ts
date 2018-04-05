import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Config } from '../../app.config';
import { Show } from '../../event-launch/event-launch.model';
import { ShowInfo } from '../show-info/info.interface';
import { User } from '../../user-service/user.model';

export interface QueryToFindArtists {
  findByGenre?: string[];
  findByName?: string;
  findByLocation?: string;
  findByType?: string;
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
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  getGenres(): Observable<string[]> {
    return this.http.get(`${Config.api}/get-genres`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  getNonLiveEventsAmountData(): Observable<number> {
    return this.http.get(`${Config.api}/get-non-live-events-amount`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  getEventsList(query: {[key: string]: any}): Observable<Show[]> {
    const newQuery = {...query, userId: this.userProfile ? this.userProfile._id : ''};

    return this.http.get(`${Config.api}/get-events-list-by-query?${Config.objToQuery(newQuery)}`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  getUserFollowings(query: string): Observable<ShowInfo[]> {
    return this.http.get(`${Config.api}/get-user-followings?${query}`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  getArtistsByQuery(query: QueryToFindArtists): Observable<ShowInfo[]> {
    const querySting = Config.objToQuery(query);
    return this.http.get(`${Config.api}/get-artists-by-query?${querySting}`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  getArtisAmount(): Observable<number> {
    return this.http.get(`${Config.api}/get-artists-amount`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }
}
