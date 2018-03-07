import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { TipsContainerComponent } from './tips-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
  ],
  providers: [],
  declarations: [TipsContainerComponent],
  exports: [TipsContainerComponent]
})

export class TipsContainerModule {
}
