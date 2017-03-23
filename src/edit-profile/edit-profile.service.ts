import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../app.config';
import 'rxjs/add/observable/of';

@Injectable()
export class EditProfileService {
  public http: Http;

  public constructor(@Inject(Http) http: Http) {
    this.http = http;
  }

  public getUser(query: any): Observable<any> {
    return this.http.get(`${Config.api}/edit-profile/get-user-data?email=${query}`).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }

  public editUser(query: any): Observable<any> {
    return this.http.post(`${Config.api}/edit-profile/edit-user-data`, query).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }

  public editUserAvatar(query: any): Observable<any> {
    return this.http.post(`${Config.api}/edit-profile/edit-user-avatar`, query).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }
}
