import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule, DropdownModule, TabsModule, ButtonsModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeModule } from '../home';
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
import { ArtistProfileModule } from '../artist-profile';
import { FanProfileModule } from '../fan-profile';
import { ArtistsComponent } from '../artists/artists.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    SignUpModalComponent,
    FirstStepComponent,
    SecondStepComponent,
    ArtistsComponent
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
    FanProfileModule
  ],
  providers: [
    LoginService,
    SignUpService,
    AuthService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
