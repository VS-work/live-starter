import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import { FileItem, FileUploader } from 'ng2-file-upload';

import { Config } from '../../app.config';
import { FileConfig } from './fileUploader.interface';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnDestroy {
  @Input() set temporaryFiles(files: FileItem[]) {
    if (!files.length) {
      return;
    }
    this.uploader.queue = files;
  };
  @Input() config: FileConfig = {
    isMultiple: false,
    acceptTypes: '',
    labelText: '',
    name: '',
    error: {
      message: '',
      isShow: false
    }
  };
  @Output() setTemporaryPosters: EventEmitter<any> = new EventEmitter();

  public isDropping = false;

  uploader: FileUploader = new FileUploader({
    url: `${Config.api}/api`,
    disableMultipart: false,
    formatDataFunctionIsAsync: false,
    additionalParameter: {}
  });

  ngOnDestroy() {
    this.setTemporaryPosters.emit(this.uploader.queue);
  }

  sendFiles(insertId: string): void {
    if (!this.uploader.getNotUploadedItems().length) {
      return;
    }
    this.uploader.options.additionalParameter.eventId = insertId;
    if (this.config.isMultiple) {
      this.uploader.uploadAll();
      return;
    }

    this.uploader.queue[this.uploader.queue.length - 1].upload();

  }

  fileOverBase(e: boolean): void {
    this.isDropping = e;
  }
}

