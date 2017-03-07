import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EditProfileComponent } from '../edit-profile';

export const routes: Routes = [
  {path: '', component: EditProfileComponent},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
