import { Component, Input } from '@angular/core';

import { Comment } from './comment.model';
import { FanType } from '../../enums/user-types.enum';
import { RouterLinks } from '../../enums';
import { ShortUserInfo } from '../short-user-info/short-user-info.interface';

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
    this.commentator = {
      ...this.commentData.commentator,
      ...{
        userProfileLink: {
          routerLink: this.commentData.commentator.type === FanType.type ? `/${RouterLinks.FanProfile}` : `/${RouterLinks.ArtistProfile}`,
          queryParams: {
            id: this.commentData.commentator._id
          }
        },
      }
    }
  }

  commentator: ShortUserInfo;

  commentData: Comment;
}
