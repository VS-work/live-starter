import { NgModule } from '@angular/core';

import { CommentComponent } from '../comment';
import { ShortUserInfoModule } from '../short-user-info/short-user-info.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ShortUserInfoModule
  ],
  declarations: [CommentComponent],
  exports: [CommentComponent],
})

export class CommentModule {
}
