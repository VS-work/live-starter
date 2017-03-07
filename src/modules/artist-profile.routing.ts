import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ArtistProfileComponent } from '../artist-profile';

export const routes: Routes = [
  { path: '', component: ArtistProfileComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
