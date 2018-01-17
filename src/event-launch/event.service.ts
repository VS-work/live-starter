import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../app.config';
import 'rxjs/add/observable/of';
import { Show } from './event-launch.model';
import { NewEventResponse } from './event-launch.interface';

@Injectable()
export class EventService {
  public http: Http;

  public constructor(@Inject(Http) http: Http) {
    this.http = http;
  }

  public saveNewEvent(query: Show): Observable<NewEventResponse> {
    return this.http.post(`${Config.api}/save-event`, query)
      .map(res => res.json());
  }
}
