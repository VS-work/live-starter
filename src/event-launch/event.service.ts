import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../app.config';
import 'rxjs/add/observable/of';

@Injectable()
export class EventService {
  public http: Http;

  public constructor(@Inject(Http) http: Http) {
    this.http = http;
  }

  public getAllEvents(): Observable<any> {
    return this.http.get(`${Config.api}/getEvents`).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }

  public saveNewEvent(query: any): Observable<any> {
    return this.http.post(`${Config.api}/saveEvent`, query).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }
}
