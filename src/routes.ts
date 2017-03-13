import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {path: 'home', loadChildren: 'home/home.module#HomeModule'},
  {path: 'first-step', loadChildren: 'signup/first-step/first-step-signup.module#SignupFirstStepModule'},
  {path: 'second-step', loadChildren: 'signup/second-step/second-step-signup.module#SignupSecondStepModule'},
  {path: 'artists', loadChildren: 'artists/artists.module#ArtistsModule'},
  {path: 'artist-profile', loadChildren: 'artist-profile/artist-profile.module#ArtistProfileModule'},
  {path: 'fan-profile', loadChildren: 'fan-profile/fan-profile.module#FanProfileModule'},
  {path: 'edit-profile', loadChildren: 'edit-profile/edit-profile.module#EditProfileModule'},
  {path: 'blog', loadChildren: 'blog/blog.module#BlogModule'},
  {path: 'about', loadChildren: 'about/about.module#AboutModule'},
  {path: 'how-it-works', loadChildren: 'how-it-works/how-it-works.module#HowItWorksModule'},
  {path: 'faq', loadChildren: 'faq/faq.module#FAQModule'},
  {path: 'launch', loadChildren: 'event-launch/event-launch.module#EventLaunchModule'},
  {path: 'events', loadChildren: 'events-list/events-list.module#EventsListModule'},
  {path: 'contact', loadChildren: 'contacts-livestarter/contacts-livestarter.module#LiveStarterContactsModule'},
  {path: '**', redirectTo: 'home'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
