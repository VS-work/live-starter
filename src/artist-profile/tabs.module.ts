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

@NgModule({
  declarations: [
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
  providers: [],
  exports: [
    BiographyComponent,
    MusicComponent,
    CommentsComponent,
    ContactsComponent,
    ShowsComponent,
    TipsComponent
  ]
})
export class ArtistTabsModule {
}
