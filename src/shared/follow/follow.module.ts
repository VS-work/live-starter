import { NgModule } from '@angular/core';

import { FollowComponent } from './follow.component';
import { FollowService } from './follow.service';

@NgModule({
  imports: [],
  providers: [FollowService],
  declarations: [FollowComponent],
  exports: [FollowComponent]
})

export class FollowModule {
}
