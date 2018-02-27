import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { UserService } from '../user-service/user.service';
import { ShortUserInfoModule } from '../shared/short-user-info/short-user-info.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  providers: [
    AuthService,
    UserService
  ],
  imports: [
    RouterModule,
    BsDropdownModule.forRoot(),
    CommonModule,
    ShortUserInfoModule
  ],
  exports: [
    AuthComponent
  ]
})

export class AuthModule {
}
