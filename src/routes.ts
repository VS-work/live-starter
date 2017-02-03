import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { FirstStepComponent } from './signup/first-step/first-step.component';
import { SecondStepComponent } from './signup/second-step/second-step.component';
import { ArtistsComponent } from './artists/artists.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'first-step', component: FirstStepComponent},
  {path: 'second-step', component: SecondStepComponent},
  {path: 'artists', component: ArtistsComponent},
  {path: '**', redirectTo: 'home'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

