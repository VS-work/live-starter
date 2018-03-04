import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ContactsLiveStarterComponent } from './contacts-livestarter.component';
import { routing } from '../modules/contacts-ls.routing';
import { GmapsModule } from '../shared/gmaps/gmaps.module';
import { ContactsLivestarterService } from './contacts-livestarter.service';

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    GmapsModule
  ],
  providers: [ContactsLivestarterService],
  declarations: [ContactsLiveStarterComponent]
})

export class LiveStarterContactsModule {
}
