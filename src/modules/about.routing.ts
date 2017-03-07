import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AboutComponent } from '../about';

export const routes: Routes = [
  { path: '', component: AboutComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
