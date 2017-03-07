import { NgModule } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { ArtistsComponent } from './artists.component';
import { routing } from '../modules/artists.routing';


@NgModule({
  imports: [
    routing,
    DropdownModule.forRoot()],
  declarations: [ArtistsComponent]
})

export class ArtistsModule {
}
