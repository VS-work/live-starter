import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { Config } from '../../app.config';
import { ShowInfo } from '../show-info/info.interface';
import { User } from '../services/user-management-service';
import { Show } from '../services/show-management-service';
import { ShowManagementService } from '../services/show-management-service/show-management.service';

export interface QueryToFindArtists {
  findByGenre?: string[];
  findByName?: string;
  findByLocation?: string;
  findByType?: string;
}

export interface SearchResult {
  users: ShowInfo[],
  events: ShowInfo[]
}

export interface SearchResultResponse {
  users: ShowInfo[],
  events: Show[]
}

@Injectable()
export class SearchService {
  userProfile: User;

  constructor(private http: HttpClient, private showManagementService: ShowManagementService) {
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

  getArtistsByQuery(query: QueryToFindArtists): Observable<ShowInfo[]> {
    const querySting = Config.objToQuery(query);
    return this.http.get(`${Config.api}/get-artists-by-query?${querySting}`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  searchByQuery(query: string): Observable<SearchResult> {
    return this.http.get(`${Config.api}/search-by-query?query=${query}`)
      .pipe(
        map((res: SearchResultResponse) => {
          return {
            users: res.users.map(data => {
              return {
                user: new User(data.user),
                show: new Show(data.show)
              }
            }),
            events: res.events.map(show => {
                return {
                  isEvent: true,
                  show: new Show(this.showManagementService.parseShowAccordingsToTimeZone(show))
                }
              }
            )
          }
        }),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        }));
  }
}
