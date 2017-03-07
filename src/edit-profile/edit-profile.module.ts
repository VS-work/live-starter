import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ng2-bootstrap/buttons';

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
    SharedModule,
    ButtonsModule.forRoot(),
    FormsModule
  ],
  providers: [EditProfileService],
  exports: []
})

export class EditProfileModule {
}
