import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { FanProfileComponent } from '../fan-profile';

export const routes: Routes = [
  {path: '', component: FanProfileComponent},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
