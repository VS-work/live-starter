import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'ng2-file-upload';

import { FileUploaderComponent } from './file-uploader.component';

@NgModule({
  imports: [CommonModule, FileUploadModule],
  declarations: [FileUploaderComponent],
  exports: [FileUploaderComponent]
})
export class FileUploaderModule {

}
