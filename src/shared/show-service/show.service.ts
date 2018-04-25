import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import * as moment from 'moment-timezone';
import { Config } from '../../app.config';
import { NewEventResponse, Show } from './show.model';
import { User, UserService } from '../services/user-service';
import { ConfigForTransformDateAccordingToTimeZone } from './config-for-transform-date-according-to-time-zone.interface';

@Injectable()
export class ShowService {

  userProfile: User;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userProfile = this.userService.getUserFromLocalStorage();
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

  private parseShowAccordingsToTimeZone(show: Show): Show {
    const dateFormat = 'dddd, MMMM DD YYYY, h:mm:ss a';
    show.timePerformance.start = this.getDateAccordingToTimeZone({date: new Date(show.timePerformance.start), dateFormat});
    show.timePerformance.end = this.getDateAccordingToTimeZone({date: new Date(show.timePerformance.end), dateFormat});

    return show;
  }

  getDateAccordingToTimeZone(config?: ConfigForTransformDateAccordingToTimeZone): string {
    const dateFormat = config && config.dateFormat ? config.dateFormat :  'dddd, MMMM DD YYYY, h:mm:ss a ZZ';
    const userTimeZone = config && config.timeZone ? config.timeZone : moment.tz.guess();

    return (config && config.date ? moment(config.date) : moment())
      .tz(userTimeZone)
      .format(dateFormat);
  }
}
