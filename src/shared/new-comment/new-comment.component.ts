import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CommentConfig, CommentsService, NewCommentRqstObj } from '../services/comments/comments.service';
import { Comment } from '../comment/comment.model';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent {
  @Output() addComment: EventEmitter<Comment> = new EventEmitter();
  @Input() commentConfig: CommentConfig;

  newComment = '';

  constructor(private commentsService: CommentsService) {
  }

  submitForm(form: NgForm): void {
    if (!form.dirty || form.invalid || !this.commentConfig) {
      return;
    }

    const newCommentRqstObj: NewCommentRqstObj = {...this.commentConfig, ...{comment: this.newComment.trim()}};

    const newCommentsSubscription = this.commentsService.newComment(newCommentRqstObj);

    newCommentsSubscription
      .subscribe(res => {
        this.addComment.emit(res);
        form.resetForm();
      }, err => {
        console.error('something went wrong: ', err);
      });

  }
}
