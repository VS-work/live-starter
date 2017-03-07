import { NgModule } from '@angular/core';

import { ContactsLiveStarterComponent } from './contacts-livestarter.component';
import { routing } from '../modules/contacts-ls.routing';

@NgModule({
  imports: [routing],
  declarations: [ContactsLiveStarterComponent]
})

export class LiveStarterContactsModule {
}
