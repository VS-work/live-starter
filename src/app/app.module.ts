import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ScrollToModule} from 'ng2-scroll-to';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../header';
import { SharedModule, LocalStorageService } from '../shared';
import { routing } from '../routes';
import { FooterComponent } from '../footer';
import { AuthGuard } from '../auth0/auth.guard';
import { AuthModule } from '../auth0/auth.module';
import { ShowManagementService } from '../shared/services/show-management-service';
import { CommentsService } from '../shared/services';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
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
    RouterModule,
    AuthModule.forRoot(),
  ],
  providers: [
    LocalStorageService,
    AuthGuard,
    ShowManagementService,
    CommentsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
