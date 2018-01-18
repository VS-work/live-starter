import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from '../modules/my-followings.routing';
import { MyFollowingsComponent } from './my-followings.component';
import { ShowInfoModule } from '../shared/show-info/show-info.module';
import { MyPagesHeaderModule } from '../shared/my-pages-header/my-pages-header.module';

@NgModule({
  imports: [
    routing,
    ShowInfoModule,
    MyPagesHeaderModule,
    CommonModule
  ],
  declarations: [
    MyFollowingsComponent,
  ]
})

export class MyFollowingsModule {
}
