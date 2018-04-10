import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap';
import { ImageCropperModule } from 'ngx-img-cropper';

import { CropImageComponent } from './crop-image.component';
import { UploadFilesService } from '../upload-files/upload-files.service';

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    ModalModule.forRoot()
  ],
  declarations: [
    CropImageComponent
  ],
  providers: [UploadFilesService],
  exports: [CropImageComponent]
})

export class CropImageModule {
}
