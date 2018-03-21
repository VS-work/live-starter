import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ManageLiveStreamComponent } from '../manage-live-stream/manage-live-stream.component';

export const routes: Routes = [
  { path: '', component: ManageLiveStreamComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
