import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MyPagesHeaderComponent } from './my-pages-header.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    MyPagesHeaderComponent,
  ],
  exports: [
    MyPagesHeaderComponent
  ]
})

export class MyPagesHeaderModule {
}
