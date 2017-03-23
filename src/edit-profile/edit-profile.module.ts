import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScrollToModule } from 'ng2-scroll-to';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { AlertModule } from 'ng2-bootstrap/alert';

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
    DropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [EditProfileService],
  exports: []
})

export class EditProfileModule {
}
