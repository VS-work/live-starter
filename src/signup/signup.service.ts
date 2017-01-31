import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../app.config';

import 'rxjs/add/operator/map';

@Injectable()
export class SignUpService {
  public http: Http;

  public constructor(@Inject(Http) http: Http) {
    this.http = http;
  }

  public signupUser(query: any): Observable<any> {
    return this.http.post(`${Config.api}/signup`, query).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }

  public isEmailExist(query: any): Observable<any> {
    return this.http.post(`${Config.api}/signup/check-email`, query).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }

  public signupGetLocations(): Observable<any> {
    return this.http.get(`${Config.api}/signup/get-locations`).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }
}
