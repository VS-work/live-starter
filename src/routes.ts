import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: 'home'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

