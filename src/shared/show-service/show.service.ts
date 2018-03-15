import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Config } from '../../app.config';
import { NewEventResponse, Show } from './show.model';
import { User } from '../../user-service/user.model';
import { UserService } from '../../user-service/user.service';

@Injectable()
export class ShowService {

  userProfile: User;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userProfile = this.userService.getUserFromLocalStorage();
  }

  saveNewEvent(query: Show): Observable<NewEventResponse> {
    return this.http.post(`${Config.api}/save-event`, query)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  getEventsListByQuery(query: {[key: string]: any}): Observable<Show[]> {
    const newQuery = {...query, userId: this.userProfile ? this.userProfile._id : ''};

    return this.http.get(`${Config.api}/get-events-list-by-query?${Config.objToQuery(newQuery)}`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }

  sortShows(shows: Show[] ): Show[] {
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
}
