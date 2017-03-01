import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../app.config';
import 'rxjs/add/observable/of';

@Injectable()
export class GetEventsListService {
  public http: Http;

  public constructor(@Inject(Http) http: Http) {
    this.http = http;
  }

  public getNonLiveEventsAmountData(): Observable<any> {
    return this.http.get(`${Config.api}/getNonLiveEventsAmount`).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }

  public getEventsList(query: string): Observable<any> {
    return this.http.get(`${Config.api}/getEventsListByQuery?${query}`).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }
}
