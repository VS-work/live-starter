import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowComponent } from './follow.component';
import { FollowService } from './follow.service';

@NgModule({
  imports: [CommonModule],
  providers: [FollowService],
  declarations: [FollowComponent],
  exports: [FollowComponent]
})

export class FollowModule {
}
