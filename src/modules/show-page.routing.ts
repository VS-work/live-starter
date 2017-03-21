import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ShowPageComponent } from '../show-page';

export const routes: Routes = [
  { path: '', component: ShowPageComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
