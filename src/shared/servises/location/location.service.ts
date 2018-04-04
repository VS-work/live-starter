import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Config } from '../../../app.config';
import { City, Country } from '../../models/location.model';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
    return this.http.get(`${Config.api}/get-countries`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }

  getCities(country: string): Observable<City[]> {
    return this.http.get(`${Config.api}/get-cities?${Config.objToQuery({country})}`)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }
}
