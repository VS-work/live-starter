import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MyProfileComponent } from '../my-profile/my-profile.component';

export const routes: Routes = [
  { path: '', component: MyProfileComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
