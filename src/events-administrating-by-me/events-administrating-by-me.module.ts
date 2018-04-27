import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from '../modules/my-current-shows.routing';
import { MyPagesHeaderModule } from '../shared/my-pages-header/my-pages-header.module';
import { ShowInfoModule } from '../shared/show-info/show-info.module';
import { EventsAdministratingByMeComponent } from './events-administrating-by-me.component';

@NgModule({
  imports: [
    routing,
    CommonModule,
    ShowInfoModule,
    MyPagesHeaderModule,
  ],
  declarations: [
    EventsAdministratingByMeComponent
  ]
})

export class EventsAdministratingByMeModule {
}
