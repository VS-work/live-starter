import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { FirstStepComponent } from './signup/first-step/first-step.component';
// import { SecondStepComponent } from './signup/second-step/second-step.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'first-step', component: FirstStepComponent},
  // {path: 'second-step', component: SecondStepComponent},
  {path: '**', redirectTo: 'home'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

