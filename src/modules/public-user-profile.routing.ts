import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PublicUserProfileComponent } from '../public-user-profile';

export const routes: Routes = [
  {path: '', component: PublicUserProfileComponent},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
