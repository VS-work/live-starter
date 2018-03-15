import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Config } from '../../app.config';
import { PurchaseParamsModel, PurchaseResponce } from './purchase-container.model';

@Injectable()
export class PurchaseContainerService {

  constructor(private http: HttpClient) {

  }

  getFreeTicket(queryObj: PurchaseParamsModel): Observable<PurchaseResponce> {
    const query = Config.objToQuery(queryObj);
    return this.http.get(`${Config.api}/get-free-ticket?${query}`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);
        return Observable.throw(err.error)
      }));
  }
}
