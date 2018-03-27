import { Component, Output, ViewChild, EventEmitter } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';

import { UploadFile } from '../upload-files/upload-file.model';
import { UploadFilesService } from '../upload-files/upload-files.service';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent {
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  @ViewChild('cropImgModal') cropImgModal: ModalDirective;
  @Output() croppedFile: EventEmitter<UploadFile> = new EventEmitter();

  isModalShown = false;
  data: any;
  cropperSettings: CropperSettings;
  fileName = '';

  constructor(private uploadFilesService: UploadFilesService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 240;
    this.cropperSettings.minWidth = 240;
    this.cropperSettings.height = 240;
    this.cropperSettings.minHeight = 240;
    this.cropperSettings.croppedWidth = 240;
    this.cropperSettings.croppedHeight = 240;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = true;
    this.cropperSettings.noFileInput = true;

    this.data = {};
  }

  setImage($event: any): void {
    this.showModal();

    const image = new Image();
    const file: File = $event.target.files[0];
    this.fileName = file.name;
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.cropImgModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
    this.cropper.reset();
  }

  saveImage(): void {
    this.uploadFilesService.base64ToBlob(this.data.image)
      .then((blob: Blob) => {
        const fileObj = new UploadFile({file: blob, fileName: this.fileName});
        this.croppedFile.emit(fileObj);
        this.hideModal();
      });
  }
}
