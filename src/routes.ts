import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './auth0/auth.guard';

export const routes: Routes = [
  {path: 'launch', loadChildren: '../event-launch/event-launch.module#EventLaunchModule',  canActivate: [AuthGuard]},
  {path: 'my-events', loadChildren: '../my-events/my-events.module#MyEventsModule', canActivate: [AuthGuard]},
  {path: 'my-followings', loadChildren: '../my-followings/my-followings.module#MyFollowingsModule', canActivate: [AuthGuard]},
  {path: 'edit-profile', loadChildren: '../edit-profile/edit-profile.module#EditProfileModule', canActivate: [AuthGuard]},
  {path: 'home', loadChildren: '../home/home.module#HomeModule'},
  {path: 'artists', loadChildren: '../artists/artists.module#ArtistsModule'},
  {path: 'artist-profile', loadChildren: '../artist-profile/artist-profile.module#ArtistProfileModule'},
  {path: 'fan-profile', loadChildren: '../fan-profile/fan-profile.module#FanProfileModule'},
  {path: 'blog', loadChildren: '../blog/blog.module#BlogModule'},
  {path: 'about', loadChildren: '../about/about.module#AboutModule'},
  {path: 'show-page', loadChildren: '../show-page/show-page.module#ShowPageModule'},
  {path: 'how-it-works', loadChildren: '../how-it-works/how-it-works.module#HowItWorksModule'},
  {path: 'faq', loadChildren: '../faq/faq.module#FAQModule'},
  {path: 'help-support', loadChildren: '../help-support/help-support.module#HelpSupportModule'},
  {path: 'events', loadChildren: '../events-list/events-list.module#EventsListModule'},
  {path: 'contact', loadChildren: '../contacts-livestarter/contacts-livestarter.module#LiveStarterContactsModule'},
  {path: '**', redirectTo: 'home'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
