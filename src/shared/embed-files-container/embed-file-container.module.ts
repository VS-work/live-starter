import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmbedFileContainerComponent } from './embed-file-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EmbedFileContainerComponent],
  exports: [EmbedFileContainerComponent]
})

export class EmbedFileContainerModule {
}
