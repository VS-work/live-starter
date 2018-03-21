import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WowzaPlayerService } from './wowza-player.service';
import { WowzaPlayerComponent } from './wowza-player.component';

@NgModule({
  declarations: [WowzaPlayerComponent],
  providers: [WowzaPlayerService],
  imports: [CommonModule],
  exports: [WowzaPlayerComponent]
})
export class WowzaPlayerModule {

}
