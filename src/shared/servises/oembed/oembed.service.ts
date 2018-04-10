import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

import { LinkWithEmbedCode } from '../../show-service/show.model';

interface OEmbedResponseObj {
  width?: number;
  author_name: string;
  author_url?: string;
  version?: string;
  provider_url?: string;
  provider_name?: string;
  thumbnail_width?: number;
  thumbnail_url?: string;
  height?: number,
  thumbnail_height?: number;
  html: string;
  url?: string;
  type?: string;
  title?: string;

  [key: string]: any;
}

@Injectable()
export class OembedService {
  constructor(private http: HttpClient) {
  }

  getEmbedCode(url: string): Observable<LinkWithEmbedCode> {
    return this.http.get(`https://noembed.com/embed?url=${url}`)
      .pipe(
        map((res: OEmbedResponseObj) => {
          const linkWithEmbedCode: LinkWithEmbedCode = {
            link: url,
            embedCode: res.html
          };

          if (res.provider_name === 'SoundCloud') {
            linkWithEmbedCode.embedCode = res.html.replace('height="400"', 'height="166"');
          }

          if (res.provider_name === 'YouTube' || res.provider_name === 'Vimeo') {
            linkWithEmbedCode.embedCode = res.html.replace('<iframe', '<iframe class="embed-responsive-item"');
          }

          return new LinkWithEmbedCode(linkWithEmbedCode);
        }), catchError(err => {
          console.error('something went wrong: ', err);

          return _throw(err.error)
        }));
  }
}

