import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './auth0/auth.guard';
import { RouterLinks } from './enums/router-links.emum';

export const routes: Routes = [
  {path: RouterLinks.CreateEvent, loadChildren: '../event-launch/event-launch.module#EventLaunchModule',  canActivate: [AuthGuard]},
  {path: RouterLinks.MyEvents, loadChildren: '../my-events/my-events.module#MyEventsModule', canActivate: [AuthGuard]},
  {path: RouterLinks.MyFollowing, loadChildren: '../my-followings/my-followings.module#MyFollowingsModule', canActivate: [AuthGuard]},
  {
    path: RouterLinks.MyCurrentShows,
    loadChildren: '../events-administrating-by-me/events-administrating-by-me.module#EventsAdministratingByMeModule',
    canActivate: [AuthGuard]
  },
  {
    path: RouterLinks.ManageLiveStream,
    loadChildren: '../manage-live-stream/manage-live-stream.module#ManageLiveStreamModule',
    canActivate: [AuthGuard]
  },
  {path: RouterLinks.MyAccount, loadChildren: '../edit-profile/edit-profile.module#EditProfileModule', canActivate: [AuthGuard]},
  {path: RouterLinks.Home, loadChildren: '../home/home.module#HomeModule'},
  {path: RouterLinks.Artists, loadChildren: '../artists/artists.module#ArtistsModule'},
  {path: RouterLinks.ArtistProfile, loadChildren: '../artist-profile/artist-profile.module#ArtistProfileModule'},
  {path: 'fan-profile', loadChildren: '../fan-profile/fan-profile.module#FanProfileModule'},
  {path: RouterLinks.Blog, loadChildren: '../blog/blog.module#BlogModule'},
  {path: 'about', loadChildren: '../about/about.module#AboutModule'},
  {path: RouterLinks.ShowPage, loadChildren: '../show-page/show-page.module#ShowPageModule'},
  {path: RouterLinks.HowItWorks, loadChildren: '../how-it-works/how-it-works.module#HowItWorksModule'},
  {path: 'faq', loadChildren: '../faq/faq.module#FAQModule'},
  {path: 'help-support', loadChildren: '../help-support/help-support.module#HelpSupportModule'},
  {path: RouterLinks.Events, loadChildren: '../events-list/events-list.module#EventsListModule'},
  {path: RouterLinks.HowItWorks, loadChildren: '../contacts-livestarter/contacts-livestarter.module#LiveStarterContactsModule'},
  {path: '**', redirectTo: 'home'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
