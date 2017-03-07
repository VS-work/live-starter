import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { BlogComponent } from '../blog';

export const routes: Routes = [
  { path: '', component: BlogComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
