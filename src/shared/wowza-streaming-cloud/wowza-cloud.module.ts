import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { WowzaCloudComponent } from './wowza-cloud.component';
import { WowzaCloudService } from './wowza-cloud.service';
import { WowzaPlayerComponent } from './wowza-player/wowza-player.component';
import { ListOfEncodersComponent } from './list-of-encoders/list-of-encoders.component';

@NgModule({
  declarations: [
    WowzaCloudComponent,
    WowzaPlayerComponent,
    ListOfEncodersComponent
  ],
  providers: [WowzaCloudService],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    AlertModule.forRoot()
  ],
  exports: [
    WowzaCloudComponent,
    WowzaPlayerComponent,
    ListOfEncodersComponent
  ]
})
export class WowzaCloudModule {

}
