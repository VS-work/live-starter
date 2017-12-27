import { HttpHeaders } from '@angular/common/http';

export class Config {
  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };

  static frontendPath = 'https://livestarter-c828d.firebaseapp.com';
  // static frontendPath = 'http://localhost:4200';

  // public static api = '//192.168.1.75:3001';
  public static api = '//livestarter-api.herokuapp.com';
  // public static api = '//immense-mesa-67919.herokuapp.com';

  public static objToQuery(data:  { [key: string]: any }): string {
    return Object.keys(data).map((k: string) => {
      return encodeURIComponent(k) + '=' + data[k];
    }).join('&');
  }
}
