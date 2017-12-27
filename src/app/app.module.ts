import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ScrollToModule} from 'ng2-scroll-to';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../header';
import { SignUpService } from '../signup';
import { SharedModule, LocalStorageService } from '../shared';
import { AuthService } from '../auth';
import { routing } from '../routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ScrollToModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    ToastyModule.forRoot(),
    SharedModule,
    routing,
    RouterModule
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
