import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EventsAdministratingByMeComponent } from '../events-administrating-by-me/events-administrating-by-me.component';

export const routes: Routes = [
  { path: '', component: EventsAdministratingByMeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
