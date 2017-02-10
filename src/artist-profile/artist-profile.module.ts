import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, TabsModule } from 'ng2-bootstrap';

import { SharedModule } from '../shared';
import { BiographyComponent } from './bio/bio.component';
import { MusicComponent } from './music/music.component';
import { CommentsComponent } from './comments/comments.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ShowsComponent } from './shows/shows.component';
import { TipsComponent } from './tips/tips.component';
import { ArtistProfileComponent } from './artist-profile.component';
import { ArtistProfileService } from './artist-profile.service';

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
    BrowserModule,
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
