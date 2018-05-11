import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { Config } from '../../../app.config';
import { Comment } from '../../comment/comment.model';

export interface CommentConfig {
  commentator: string;
  commentedUser: string;
}

export interface NewCommentRqstObj extends CommentConfig {
  comment: string;
  dateCreated?: string;
}

export interface GetCommentsQuery {
  limit?: number;
  findByCommentator?: string;
  findByCommentedUser?: string
}

@Injectable()
export class CommentsService {
  constructor(private http: HttpClient) {
  }

  newComment(rqstObj: NewCommentRqstObj): Observable<Comment> {
    return this.http.post(`${Config.api}/new-comment`, JSON.stringify(rqstObj), Config.httpOptions)
      .pipe(
        map(((comment: Comment) => new Comment(comment))),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }

  getComments(query: GetCommentsQuery = {}): Observable<Comment[]> {
    return this.http.get(`${Config.api}/get-comments?${Config.objToQuery(query)}`, Config.httpOptions)
      .pipe(
        map((comments: Comment[]) => comments.map(comment => new Comment(comment))),
        catchError(err => {
          console.error('something went wrong: ', err);

          return Observable.throw(err.error)
        })
      );
  }
}
