import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { FOR_ARTISTS, FOR_FANS, HowItWorksInfo } from './how-it-works-info.interface';

@Injectable()
export class HowItWorksService {

  getInfoForArtists(): Observable<any> {
    return of(FOR_ARTISTS)
  }

  getInfoForFans(): Observable<HowItWorksInfo> {
    return of(FOR_FANS);
  }
}
