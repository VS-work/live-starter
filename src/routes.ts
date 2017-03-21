import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {path: 'home', loadChildren: 'home#HomeModule'},
  {path: 'first-step', loadChildren: 'signup#SignupFirstStepModule'},
  {path: 'second-step', loadChildren: 'signup#SignupSecondStepModule'},
  {path: 'artists', loadChildren: 'artists#ArtistsModule'},
  {path: 'artist-profile', loadChildren: 'artist-profile#ArtistProfileModule'},
  {path: 'fan-profile', loadChildren: 'fan-profile#FanProfileModule'},
  {path: 'edit-profile', loadChildren: 'edit-profile#EditProfileModule'},
  {path: 'blog', loadChildren: 'blog#BlogModule'},
  {path: 'about', loadChildren: 'about#AboutModule'},
  {path: 'show-page', loadChildren: 'show-page#ShowPageModule'},
  {path: 'how-it-works', loadChildren: 'how-it-works#HowItWorksModule'},
  {path: 'faq', loadChildren: 'faq#FAQModule'},
  {path: 'help-support', loadChildren: 'help-support#HelpSupportModule'},
  {path: 'launch', loadChildren: 'event-launch#EventLaunchModule'},
  {path: 'events', loadChildren: 'events-list#EventsListModule'},
  {path: 'contact', loadChildren: 'contacts-livestarter#LiveStarterContactsModule'},
  {path: '**', redirectTo: 'home'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
