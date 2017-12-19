export class Config {

  // public static api = '//192.168.1.75:3001';
  public static api = '//livestarter-api.herokuapp.com/';
  // public static api = '//immense-mesa-67919.herokuapp.com';

  public static objToQuery(data: any): string {
    return Object.keys(data).map((k: string) => {
      return encodeURIComponent(k) + '=' + data[k];
    }).join('&');
  }
}
