import { Component } from '@angular/core';
import { Comment } from '../comment/comment.model';
import { CommentsService } from '../services';

@Component({
  selector: 'app-what-they-say',
  templateUrl: './what-they-say.component.html',
  styleUrls: ['./what-they-say.component.scss']
})
export class WhatTheySayComponent {
  comments: Comment[] = [];

  constructor(private commentsService: CommentsService) {
    const comments$ = this.commentsService.getComments({limit: 6});

    comments$
      .subscribe(res => {
        this.comments = res;
      }, err => {
        console.error('something went wrong: ', err);
      });
  }
}

