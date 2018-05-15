import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { Config } from '../app.config';

export class Faq {
  _id: string;
  position: string;
  question: string;
  answer: string;

  constructor(faq: Faq) {
    this._id = faq._id;
    this.position = faq.position;
    this.question = faq.question;
    this.answer = faq.answer;
  }
}

@Injectable()
export class GetFAQsService {
  constructor(private http: HttpClient) {
  }

  getQsData(): Observable<Faq[]> {
    return this.http.get(`${Config.api}/getFAQs`)
      .pipe(
        map((data: Faq[]) => data.map(faq => new Faq(faq))),
        catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }
}
