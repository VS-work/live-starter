import { Component, Input } from '@angular/core';

import { Comment } from './comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() set setCommentData(commentData: Comment) {
    if (!commentData) {
      return;
    }

    this.commentData = commentData;
  }

  commentData: Comment;
}
