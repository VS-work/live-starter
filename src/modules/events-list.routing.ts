import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EventsListComponent } from '../events-list';

export const routes: Routes = [
  {path: '', component: EventsListComponent},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
