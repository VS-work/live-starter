import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../app.config';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  public http: Http;

  public constructor(@Inject(Http) http: Http) {
    this.http = http;
  }

  public loginUser(query: any): Observable<any> {
    return this.http.post(`${Config.api}/login`, query).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }
}
