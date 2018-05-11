import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Comment } from '../../shared/comment/comment.model';
import { CommentsService } from '../../shared/services';
import { CommentConfig } from '../../shared/services/comments/comments.service';
import { User, UserManagementService } from '../../shared/services/user-management-service';
import { AuthService } from '../../auth0/auth.service';

@Component({
  selector: 'app-comments-tab',
  templateUrl: './comments-tab.component.html',
  styleUrls: ['./comments-tab.component.scss']
})

export class CommentsTabComponent implements OnInit, OnDestroy {
  @Input() set setCommentConfig(userId: string) {
    this.userId = userId;
    this.currentUser = this.userManagementService.getUserFromLocalStorage();
    this.parseCommentConfig(this.userId);

    const comments$ = this.commentsService.getComments({findByCommentedUser: this.userId});

    comments$
      .subscribe(res => {
        this.comments = res;
      }, err => {
        console.error('something went wrong: ', err);
      });

  };
  userId: string;
  comments: Comment[] = [];
  commentConfig: CommentConfig;
  currentUser: User;
  loginSubscription$: Subscription;

  constructor(private commentsService: CommentsService,
              private userManagementService: UserManagementService,
              private authService: AuthService) {
  }

  ngOnInit() {
     this.loginSubscription$ = this.authService.loggedIn$
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          return;
        }

        this.currentUser = undefined;
        this.commentConfig = undefined;
      });
  }

  addComment(comment: Comment): void {
    this.comments.unshift(comment)
  }

  parseCommentConfig(userId: string): void {
    if (!this.currentUser || !userId) {
      return;
    }

    this.commentConfig = {
      commentedUser: userId,
      commentator: this.currentUser._id
    }
  }

  ngOnDestroy() {
    this.loginSubscription$.unsubscribe();
  }
}
