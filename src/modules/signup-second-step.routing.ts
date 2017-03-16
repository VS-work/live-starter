import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SecondStepComponent } from '../signup';

export const routes: Routes = [
  {path: '', component: SecondStepComponent},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
