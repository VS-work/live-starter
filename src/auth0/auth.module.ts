import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { UserManagementService } from '../shared/services/user-management-service';
import { ShortUserInfoModule } from '../shared/short-user-info/short-user-info.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  providers: [
    AuthService,
    UserManagementService
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
