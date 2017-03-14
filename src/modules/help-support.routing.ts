import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HelpSupportComponent } from '../help-support';

export const routes: Routes = [
  { path: '', component: HelpSupportComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
