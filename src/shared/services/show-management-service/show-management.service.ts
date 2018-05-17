import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { Config } from '../../../app.config';
import { User, UserManagementService } from '../user-management-service';
import { NewEventResponse, Show } from './';
import { ShowInfo } from '../../show-info/info.interface';
import { parseDateAccordingToTimeZone } from '../../../assets/functions/parse-date-according-totime-zone';

@Injectable()
export class ShowManagementService {

  userProfile: User;

  constructor(private http: HttpClient, private userManagementService: UserManagementService) {
    this.userProfile = this.userManagementService.getUserFromLocalStorage();
  }

  saveNewEvent(showParams: Show): Observable<NewEventResponse> {
    return this.http.post(`${Config.api}/save-event`, showParams)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }

  getEventsListByQuery(query: { [key: string]: any }): Observable<Show[]> {
    const newQuery = {...query, userId: this.userProfile ? this.userProfile._id : ''};

    return this.http.get(`${Config.api}/get-events-list-by-query?${Config.objToQuery(newQuery)}`)
      .pipe(
        map((shows: Show[]) => shows.map(show => new Show(this.parseShowAccordingsToTimeZone(show)))),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        }));
  }

  getEventsInfoListByQuery(query: { [key: string]: any }): Observable<ShowInfo[]> {
    const newQuery = {...query, userId: this.userProfile ? this.userProfile._id : ''};

    return this.http.get(`${Config.api}/get-events-list-by-query?${Config.objToQuery(newQuery)}`)
      .pipe(
        map((shows: Show[]) => this.sortShows(shows).map(show => {
            return {
              isEvent: true,
              show: new Show(this.parseShowAccordingsToTimeZone(show))
            };
          })
        ),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  getEventForManage(query: { [key: string]: any }): Observable<Show> {
    const newQuery = {...query, userId: this.userProfile ? this.userProfile._id : ''};

    return this.http.get(`${Config.api}/get-events-list-by-query?${Config.objToQuery(newQuery)}`)
      .pipe(
        map(shows => new Show(this.parseShowAccordingsToTimeZone(shows[0]))),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        }));
  }

  getEventsAmountData(query = {isLive: false}): Observable<number> {
    return this.http.get(`${Config.api}/get-events-amount?${Config.objToQuery(query)}`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }

  sortShows(shows: Show[]): Show[] {
    return shows.sort((a: Show, b: Show) => {
      const aDate = new Date(a.timePerformance.start).getTime();
      const bDate = new Date(b.timePerformance.start).getTime();

      if (a.live && b.live && !a.completed && !b.completed) {
        return aDate < bDate ? -1 : 1;
      }

      if (a.live && !a.completed) {
        return 0;
      }

      if (b.live && !b.completed) {
        return 1;
      }

      if (!a.live && !a.completed && !b.live && !b.completed) {
        return aDate < bDate ? -1 : 1;
      }

      if (!a.live && !a.completed) {
        return 0;
      }

      if (!b.live && !b.completed) {
        return 1;
      }

      if (!a.live && a.completed && !b.live && b.completed) {
        return aDate < bDate ? -1 : 1;
      }

      return 0;
    });
  }

  parseShowAccordingsToTimeZone(show: Show): Show {
    const dateFormat = 'dddd, MMMM DD YYYY, h:mm:ss a';
    show.timePerformance.start = parseDateAccordingToTimeZone({
      date: new Date(show.timePerformance.start),
      dateFormat
    });
    show.timePerformance.end = parseDateAccordingToTimeZone({date: new Date(show.timePerformance.end), dateFormat});

    return show;
  }
}
