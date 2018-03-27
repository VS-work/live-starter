import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Config } from '../../app.config';
import { UploadFile } from './upload-file.model';

interface UploadAvatartResponse {
  message: string;
  imageUrl: string;
}

@Injectable()
export class UploadFilesService {

  constructor(private http: HttpClient) {
  }

  uploadAvatar(fileObj: UploadFile): Observable<UploadAvatartResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        fileName: fileObj.fileName,
        userId: fileObj.userId,
      })
    };

    return this.http.put(`${Config.api}/upload-avatar`, fileObj.file, httpOptions)
      .pipe(catchError(err => {
        console.error('something went wrong: ', err);

        return Observable.throw(err.error)
      }));
  }

  base64ToBlob(url: string): Promise<Blob> {
    return fetch(url)
      .then((res) => res.blob());
  }
}
