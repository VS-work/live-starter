import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { routing } from '../modules/my-profile.routing';
import { MyProfileComponent } from './my-profile.component';
import { CropImageModule } from '../shared/crop-image/crop-image.module';
import { FileUploaderModule } from '../shared/file-uploader/file-uploader.module';

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    CropImageModule,
    FileUploaderModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  declarations: [
    MyProfileComponent
  ]
})

export class MyProfileModule {
}
