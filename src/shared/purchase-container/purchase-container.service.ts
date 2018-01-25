import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';

import { Config } from '../../app.config';
import { PurchaseParams, PurchaseResponce } from './purchase-container.interface';

@Injectable()
export class PurchaseContainerService {

  constructor(private http: HttpClient) {

  }

  getFreeTicket(queryObj: PurchaseParams): Observable<PurchaseResponce> {
    const query = Config.objToQuery(queryObj);
    return this.http.get(`${Config.api}/get-free-ticket?${query}`)
      .catch(err => Observable.throw(err));
  }
}
