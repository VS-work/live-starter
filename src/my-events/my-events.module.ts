import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyEventsComponent } from './my-events.component';
import { routing } from '../modules/my-events.routing';
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
    MyEventsComponent,
  ]
})

export class MyEventsModule {
}
