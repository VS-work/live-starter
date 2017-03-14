import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DropdownModule} from 'ng2-bootstrap/dropdown';
import { TabsModule} from 'ng2-bootstrap/tabs';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../header/header.component';
import { SignUpService } from '../signup/signup.service';
import { SharedModule, LocalStorageService } from '../shared';
import { AuthService } from '../auth/auth.service';
import { routing } from '../routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
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
