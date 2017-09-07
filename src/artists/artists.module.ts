import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ArtistsComponent } from './artists.component';
import { routing } from '../modules/artists.routing';
import { SharedModule, SearchService, LocalStorageService } from '../shared';

@NgModule({
  declarations: [
    ArtistsComponent
  ],
  imports: [
    routing,
    SharedModule,
    CommonModule,
    FormsModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    SearchService,
    LocalStorageService
  ]
})

export class ArtistsModule {
}
