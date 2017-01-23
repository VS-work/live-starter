import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ModalModule} from 'ng2-bootstrap/modal';

import {AppComponent} from './app.component';
import {HeaderComponent} from '../header/header.component';
import {LoginModalComponent} from '../header/login-modal/login.modal.component';
import {LoginService} from '../header/login-modal/login.modal.service';
import {SignUpService} from '../header/signup-modal/signup.modal.service';
import {SignUpModalComponent} from '../header/signup-modal/signup.modal.component';
import {SearchComponent} from '../search/search.component';
import {SearchService} from '../search/search.service';
import {SharedModule} from '../shared';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    LoginModalComponent,
    SignUpModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  providers: [SearchService, LoginService, SignUpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
