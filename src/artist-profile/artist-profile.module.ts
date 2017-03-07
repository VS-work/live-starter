import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { SharedModule } from '../shared';
import { BiographyComponent } from './bio/bio.component';
import { MusicComponent } from './music/music.component';
import { CommentsComponent } from './comments/comments.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ShowsComponent } from './shows/shows.component';
import { TipsComponent } from './tips/tips.component';
import { ArtistProfileComponent } from './artist-profile.component';
import { ArtistProfileService } from './artist-profile.service';
import { routing } from '../modules/artist-profile.routing';

@NgModule({
  declarations: [
    ArtistProfileComponent,
    BiographyComponent,
    MusicComponent,
    CommentsComponent,
    ContactsComponent,
    ShowsComponent,
    TipsComponent
  ],
  imports: [
    routing,
    CommonModule,
    SharedModule,
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule
  ],
  providers: [ArtistProfileService],
  exports: []
})
export class ArtistProfileModule {
}
