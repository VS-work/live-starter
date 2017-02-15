import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule, DropdownModule, TabsModule, ButtonsModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeModule } from '../home';
import { HeaderComponent } from '../header/header.component';
import { SignUpService } from '../header/signup-modal/signup.modal.service';
import { SignUpModalComponent } from '../header/signup-modal/signup.modal.component';
import { SharedModule } from '../shared';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../auth/localStorage.service';
import { routing } from '../routes';
import { FirstStepComponent } from '../signup/first-step/first-step.component';
import { SecondStepComponent } from '../signup/second-step/second-step.component';
import { ArtistProfileModule } from '../artist-profile';
import { FanProfileModule } from '../fan-profile';
import { EditProfileModule } from '../edit-profile';
import { ArtistsComponent } from '../artists/artists.component';
import { BlogComponent } from '../blog/blog.component';
import { AboutComponent } from '../about/about.component';
import { ContactsLiveStarterComponent } from '../contacts-livestarter/contacts-livestarter.component';
import { FAQModule } from '../faq';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpModalComponent,
    FirstStepComponent,
    SecondStepComponent,
    ArtistsComponent,
    BlogComponent,
    AboutComponent,
    ContactsLiveStarterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    SharedModule,
    routing,
    RouterModule,
    HomeModule,
    ArtistProfileModule,
    FanProfileModule,
    EditProfileModule,
    FAQModule
  ],
  providers: [
    SignUpService,
    AuthService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
