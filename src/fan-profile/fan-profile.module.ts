import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from '../shared';
import { FanProfileComponent } from './fan-profile.component';
import { BiographyComponent } from './bio/bio.component';
import { CommentsComponent } from './comments/comments.component';
import { ShowsComponent } from './shows/shows.component';
import { FanProfileService } from './fan-profile.service';
import { routing } from '../modules/fan-profile.routing';

@NgModule({
  declarations: [
    FanProfileComponent,
    BiographyComponent,
    CommentsComponent,
    ShowsComponent
  ],
  imports: [
    routing,
    CommonModule,
    SharedModule,
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule
  ],
  providers: [FanProfileService],
  exports: []
})
export class FanProfileModule {
}
