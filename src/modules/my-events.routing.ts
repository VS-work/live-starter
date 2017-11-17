import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MyEventsComponent } from '../my-events/my-events.component';

export const routes: Routes = [
  { path: '', component: MyEventsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
