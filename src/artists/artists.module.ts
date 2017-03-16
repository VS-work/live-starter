import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { ButtonsModule } from 'ng2-bootstrap/buttons';

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
    DropdownModule.forRoot()
  ],
  providers: [
    SearchService,
    LocalStorageService
  ]
})

export class ArtistsModule {
}
