import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortUserInfoComponent } from './short-user-info.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShortUserInfoComponent],
  exports: [ShortUserInfoComponent]
})

export class ShortUserInfoModule {
}
