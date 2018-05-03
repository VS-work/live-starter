import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { routing } from '../modules/public-user-profile.routing';
import { PublicUserProfileComponent, CommentsTabComponent } from './';
import { ShowInfoModule } from '../shared/show-info/show-info.module';
import { FollowModule } from '../shared/follow/follow.module';
import { StatisticsModule } from '../shared/statistics/statistics.module';
import { TipsContainerModule } from '../shared/tips-container/tips-container.module';
import { EmbedFileContainerModule } from '../shared/embed-files-container/embed-file-container.module';
import { NewCommentModule } from '../shared/new-comment';
import { CommentModule } from '../shared/comment';

@NgModule({
  declarations: [
    PublicUserProfileComponent,
    CommentsTabComponent
 ],
  imports: [
    routing,
    CommonModule,
    TabsModule.forRoot(),
    ShowInfoModule,
    FollowModule,
    StatisticsModule,
    TipsContainerModule,
    EmbedFileContainerModule,
    NewCommentModule,
    CommentModule
  ],
  providers: [],
  exports: []
})
export class PublicUserProfileModule {
}

