import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { LinkWithEmbedCode } from '../services/show-management-service';

@Component({
  selector: 'app-embed-file-container',
  templateUrl: './embed-file-container.component.html'
})
export class EmbedFileContainerComponent {
  @Input() set setFile(embeddingFile: LinkWithEmbedCode) {
    if (!embeddingFile.embedCode) {
      return;
    }

    this.file = this.domSanitizer.bypassSecurityTrustHtml(embeddingFile.embedCode);
  };

  @Input() isVideo = false;

  file: SafeHtml;

  constructor(private domSanitizer: DomSanitizer) {}

}
