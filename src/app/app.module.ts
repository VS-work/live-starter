import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule, DropdownModule, TabsModule, ButtonsModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeModule } from '../home/home.module';
import { HeaderComponent } from '../header/header.component';
import { LoginModalComponent } from '../header/login-modal/login.modal.component';
import { LoginService } from '../header/login-modal/login.modal.service';
import { SignUpService } from '../header/signup-modal/signup.modal.service';
import { SignUpModalComponent } from '../header/signup-modal/signup.modal.component';

import { SharedModule } from '../shared';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../auth/localStorage.service';
import { routing } from '../routes';
import { FirstStepComponent } from '../signup/first-step/first-step.component';
import { SecondStepComponent } from '../signup/second-step/second-step.component';
import { ArtistProfileComponent } from '../artist-profile/artist-profile.component';
import { ArtistsComponent } from '../artists/artists.component';
import { ArtistTabsModule } from '../artist-profile/tabs.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    SignUpModalComponent,
    FirstStepComponent,
    SecondStepComponent,
    ArtistsComponent,
    ArtistProfileComponent
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
    RouterModule,
    HomeModule,
    ArtistTabsModule,
    routing
  ],
  providers: [
    LoginService,
    SignUpService,
    AuthService,
    LocalStorageService
  ],
  bootstrap: [AppComponent],
  exports: [TabsModule]
})
export class AppModule {
}
