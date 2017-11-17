import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { WowzaCloudConfig } from './wowza-cloud.config';
import { Observable } from 'rxjs/Observable';
import { newStreamObj } from './new-stream.model';

declare let WowzaPlayer: any;

@Injectable()
export class WowzaCloudService {
  private url = WowzaCloudConfig.API_URL;

  constructor(private http: Http) {
  }

  private setWowzaOptions(): RequestOptions {
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'wsc-api-key': WowzaCloudConfig.API_KEY,
        'wsc-access-key': WowzaCloudConfig.ACCESS_KEY
      })
    });
  }

  getStream(id: string): Observable<any> {
    return this.http.get(`${this.url}live_streams/${id}`, this.setWowzaOptions())
      .map(res => res.json().live_stream);
  }

  getStreams(): Observable<any> {
    return this.http.get(`${this.url}live_streams`, this.setWowzaOptions())
      .map(res => res.json().live_streams);
  }

  getStreamState(id: string): Observable<any> {
    return this.http.get(`${this.url}live_streams/${id}/state`, this.setWowzaOptions())
      .map(res => res.json().live_stream.state);
  }

  updateStream(id: string, updatingObj: Object): Observable<any> {
    return this.http.patch(`${this.url}live_streams/${id}`,
      JSON.stringify({live_stream: updatingObj}), this.setWowzaOptions())
      .map(res => res.json().live_stream);
  }

  startStream(id: string): Observable<any> {
    return this.http.put(`${this.url}live_streams/${id}/start`, JSON.stringify({}), this.setWowzaOptions())
      .map(res => res.json());
  }

  stopStream(id: string): Observable<any> {
    return this.http.put(`${this.url}live_streams/${id}/stop`, JSON.stringify({}), this.setWowzaOptions())
      .map(res => res.json());
  }

  regenerateConnectionCode(id: string): Observable<any> {
    return this.http.put(`${this.url}live_streams/${id}/regenerate_connection_code`, JSON.stringify({}), this.setWowzaOptions())
      .map(res => res.json().live_stream.connection_code);
  }

  newStream(params: any): Observable<any> {
    const rqstBody = {live_stream: {...newStreamObj.live_stream, ...params}};

    return this.http.post(`${this.url}/live_streams/`, JSON.stringify(rqstBody), this.setWowzaOptions())
      .map(res => res.json());
  }

  deleteStream(id: string): Observable<any> {
    return this.http.delete(`${this.url}/live_streams/${id}`, this.setWowzaOptions())
      .map(res => res.json());
  }

  initPlayer(stream: any, cssSelector: string) {
    return WowzaPlayer.create(cssSelector, {
      ...{license: WowzaCloudConfig.PLAYER_LICENCE},
      ...stream
    });
  }

}
