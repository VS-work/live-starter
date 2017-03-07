import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ArtistsComponent } from '../artists/artists.component';

export const routes: Routes = [
  {path: '', component: ArtistsComponent},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
