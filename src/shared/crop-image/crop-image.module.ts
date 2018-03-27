import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap';
import { ImageCropperComponent } from 'ngx-img-cropper';

import { CropImageComponent } from './crop-image.component';
import { UploadFilesService } from '../upload-files/upload-files.service';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [
    CropImageComponent,
    ImageCropperComponent
  ],
  providers: [UploadFilesService],
  exports: [CropImageComponent]
})

export class CropImageModule {
}
