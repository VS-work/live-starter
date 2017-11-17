import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundingContainerComponent } from './funding-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FundingContainerComponent],
  exports: [FundingContainerComponent]
})

export class FundingContainerModule {
}
