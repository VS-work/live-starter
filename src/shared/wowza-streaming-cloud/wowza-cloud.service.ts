import { Injectable } from '@angular/core';
import { WowzaCloudConfig } from './wowza-cloud.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import {
  LiveStreamConnectionCode,
  LiveStreamStatus,
  NewStreamModel,
  WowzaResponse
} from './new-stream.model';

declare let WowzaPlayer: any;

@Injectable()
export class WowzaCloudService {
  private url = WowzaCloudConfig.API_URL;

  private rqstOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'wsc-api-key': WowzaCloudConfig.API_KEY,
      'wsc-access-key': WowzaCloudConfig.ACCESS_KEY
    })
  };

  constructor(private http: HttpClient) {
  }

  newLiveStream(params: NewStreamModel): Observable<WowzaResponse> {
    const rqstBody = {live_stream: params};

    return this.http.post(`${this.url}/live_streams/`, JSON.stringify(rqstBody), this.rqstOptions)
      .pipe(
        map((res: {live_stream: WowzaResponse}) => res.live_stream),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  getLiveStream(id: string): Observable<WowzaResponse> {
    return this.http.get(`${this.url}live_streams/${id}`, this.rqstOptions)
      .pipe(
        map((res: {live_stream: WowzaResponse}) => res.live_stream),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  startLiveStream(id: string): Observable<LiveStreamStatus> {
    return this.http.put(`${this.url}live_streams/${id}/start`, JSON.stringify({}), this.rqstOptions)
      .pipe(
        map((res: {live_stream: LiveStreamStatus}) => res.live_stream),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  stopLiveStream(id: string): Observable<LiveStreamStatus> {
    return this.http.put(`${this.url}live_streams/${id}/stop`, JSON.stringify({}), this.rqstOptions)
      .pipe(
        map((res: {live_stream: LiveStreamStatus}) => res.live_stream),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  deleteLiveStream(id: string): Observable<null> {
    return this.http.delete(`${this.url}/live_streams/${id}`, this.rqstOptions)
      .pipe(catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  updateLiveStream(id: string, updatingObj: Object): Observable<WowzaResponse> {
    const rqstBody = {live_stream: updatingObj};

    return this.http.patch(`${this.url}live_streams/${id}`, JSON.stringify(rqstBody), this.rqstOptions)
      .pipe(
        map((res: {live_stream: WowzaResponse}) => res.live_stream),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  getLiveStreamState(id: string): Observable<LiveStreamStatus> {
    return this.http.get(`${this.url}live_streams/${id}/state`, this.rqstOptions)
      .pipe(
        map((res: {live_stream: LiveStreamStatus}) => res.live_stream),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  regenerateConnectionCode(id: string): Observable<LiveStreamConnectionCode> {
    return this.http.put(`${this.url}live_streams/${id}/regenerate_connection_code`, JSON.stringify({}), this.rqstOptions)
      .pipe(
        map((res: {live_stream: LiveStreamConnectionCode}) => res.live_stream),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

}
