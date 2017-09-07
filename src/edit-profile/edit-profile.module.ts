import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ScrollToModule } from 'ng2-scroll-to';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { EditProfileComponent } from './edit-profile.component';
import { EditProfileService } from './edit-profile.service';
import { SharedModule } from '../shared';
import { routing } from '../modules/edit-profile.routing';

@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    routing,
    CommonModule,
    FormsModule,
    SharedModule,
    ScrollToModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [EditProfileService],
  exports: []
})

export class EditProfileModule {
}
