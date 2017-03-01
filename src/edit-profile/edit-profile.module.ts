import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ng2-bootstrap/buttons';

import { SharedModule } from '../shared';
import { EditProfileComponent } from './edit-profile.component';
import { EditProfileService } from './edit-profile.service';

@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ButtonsModule.forRoot(),
    FormsModule
  ],
  providers: [EditProfileService],
  exports: []
})
export class EditProfileModule {
}
