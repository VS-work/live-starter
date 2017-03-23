export class Config {

  // public static api = '//192.168.1.57:3000';
  public static api = '//immense-mesa-67919.herokuapp.com';

  public static objToQuery(data: any): string {
    return Object.keys(data).map((k: string) => {
      return encodeURIComponent(k) + '=' + data[k];
    }).join('&');
  }
}
