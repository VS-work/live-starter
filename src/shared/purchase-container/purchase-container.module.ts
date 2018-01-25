import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseContainerComponent } from './purchase-container.component';
import { PurchaseContainerService } from './purchase-container.service';

@NgModule({
  imports: [CommonModule],
  providers: [PurchaseContainerService],
  declarations: [PurchaseContainerComponent],
  exports: [PurchaseContainerComponent]
})

export class PurchaseContainerModule {
}
