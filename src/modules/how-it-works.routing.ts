import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HowItWorksComponent } from '../how-it-works';

export const routes: Routes = [
  { path: '', component: HowItWorksComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
