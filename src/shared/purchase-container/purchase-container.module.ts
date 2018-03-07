import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseContainerComponent } from './purchase-container.component';
import { PurchaseContainerService } from './purchase-container.service';
import { AuthModule } from '../../auth0/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  providers: [PurchaseContainerService],
  declarations: [PurchaseContainerComponent],
  exports: [PurchaseContainerComponent]
})

export class PurchaseContainerModule {
}
