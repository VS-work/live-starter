import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatTheySayComponent } from './what-they-say.component';
import { CommentModule } from '../comment';

@NgModule({
  imports: [
    CommonModule,
    CommentModule
  ],
  providers: [],
  declarations: [WhatTheySayComponent],
  exports: [WhatTheySayComponent]
})

export class WhatTheySayModule {
}
