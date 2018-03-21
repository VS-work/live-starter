import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ListOfEncodersComponent } from './list-of-encoders.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListOfEncodersComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  exports: [ListOfEncodersComponent]
})
export class ListOfEncodersModule {

}
