import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LaunchComponent } from '../event-launch';

export const routes: Routes = [
  {path: '', component: LaunchComponent},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
