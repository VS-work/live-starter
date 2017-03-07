import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ContactsLiveStarterComponent } from '../contacts-livestarter';

export const routes: Routes = [
  { path: '', component: ContactsLiveStarterComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
