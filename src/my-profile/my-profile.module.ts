import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from '../modules/my-profile.routing';
import { MyProfileComponent } from './my-profile.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [],
  declarations: [
    MyProfileComponent
  ]
})

export class MyProfileModule {
}
