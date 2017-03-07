import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { FAQComponent } from '../faq';

export const routes: Routes = [
  { path: '', component: FAQComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
