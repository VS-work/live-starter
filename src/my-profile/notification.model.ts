interface ShowBeginIn {
  isNotification: boolean;
  timeperiod: string;
};

export class Notifications {
  recommendedArtitsShows = false;
  featuredShows = false;
  alertMeAboutMessage = false;
  showAlreadyBegun = false;
  followingArtistCreatesNewEvent = false;
  showBeginIn: ShowBeginIn = {
    isNotification: false,
    timeperiod: '1hrs'
  };

  constructor(notifications?: Notifications) {
    if (!notifications) {
     return undefined;
    }

    this.recommendedArtitsShows = notifications.recommendedArtitsShows;
    this.featuredShows = notifications.featuredShows;
    this.alertMeAboutMessage = notifications.alertMeAboutMessage;
    this.showAlreadyBegun = notifications.showAlreadyBegun;
    this.followingArtistCreatesNewEvent = notifications.followingArtistCreatesNewEvent;
    this.showBeginIn = notifications.showBeginIn;
  }
}
