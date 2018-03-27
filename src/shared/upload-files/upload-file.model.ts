export class UploadFile {
  file: Blob;
  fileName: string;
  userId?: string;

  constructor(data: UploadFile) {
    this.file = data.file;
    this.fileName = data.fileName;
    this.userId = data.userId ? data.userId : '';
  }
}
