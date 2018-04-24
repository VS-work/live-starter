import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FewShowsContainerComponent } from './few-shows-container.component';
import { ShowInfoModule } from '../show-info/show-info.module';

@NgModule({
  imports: [
    CommonModule,
    ShowInfoModule
  ],
  declarations: [FewShowsContainerComponent],
  exports: [FewShowsContainerComponent]
})

export class FewShowsContainerModule {
}
