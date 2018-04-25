import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Config } from '../app.config';
import { CallbackForm } from './callbackForm.model';
import { User } from '../shared/services/user-service';

interface CallbackResponse {
  message: string;
  title: string;
}

@Injectable()
export class ContactsLivestarterService {
  userProfile: User;

  constructor(private http: HttpClient) {
  }

  sendCallbackForm(rqstObj: CallbackForm): Observable<CallbackResponse> {
    return this.http.post(`${Config.api}/callback-form`, JSON.stringify(rqstObj), Config.httpOptions)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }
}
