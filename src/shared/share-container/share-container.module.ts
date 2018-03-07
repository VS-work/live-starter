import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareContainerComponent } from './share-container.component';

@NgModule({
  imports: [CommonModule],
  providers: [],
  declarations: [ShareContainerComponent],
  exports: [ShareContainerComponent]
})

export class ShareContainerModule {
}
