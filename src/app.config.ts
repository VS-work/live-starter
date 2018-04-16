import { HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';

export class Config {
  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };

  static frontendPath = environment.frontendPath;

  static api = environment.api;

  public static objToQuery(data:  { [key: string]: any }): string {
    return Object.keys(data)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
      .join('&');
  }
}
