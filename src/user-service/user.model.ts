import { environment } from '../environments/environment';
import { RouterLinks } from '../enums';
import { City, Country } from '../shared/models';

interface UserInterface {
  _id?: string;
  active?: boolean;
  avatar?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  role?: string;
  type?: string;
  position?: string;
  city?: string;
  country?: string;
  groupName?: string;
  website?: string;
  profileUrl?: string;
  dateOfBirth?: Date;
  joinDate?: Date;
  biography?: string;
  location?: {
    country: Country;
    city: City
  };
  contacts?: {
    phone: string;
    skype: string;
    hangouts: string;
  };
  socials?: {
    google: string;
    facebook: string;
    twitter: string;
    instagram: string;
  };
  statistics?: {
    likes: {
      liked: number,
      likeUser: number,
      likeShow: number
    },
    viewers: number,
    followers: number,
    following: number
  };
  shows?: {
    owned: number;
    purchased: number;
  };
  viewers?: string[];
  appreciations?: string[];
  comments?: string[];
  reviews?: string[];
  videos?: string[];
  audios?: string[];
  photos?: string[];
  genres?: string[];
}

export class User {
  _id: string;
  active: boolean;
  avatar: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  type: string;
  position: string;
  city: string;
  country: string;
  groupName: string;
  website: string;
  profileUrl: string;
  dateOfBirth: Date;
  joinDate: Date;
  biography: string;
  location: {
    country: Country;
    city: City
  };
  contacts: {
    phone: string;
    skype: string;
    hangouts: string;
  };
  socials: {
    google: string;
    facebook: string;
    twitter: string;
    instagram: string;
  };
  statistics: {
    likes: {
      liked: number,
      likeUser: number,
      likeShow: number
    },
    viewers: number,
    followers: number,
    following: number
  };
  shows: {
    owned: number,
    purchased: number,
  };
  viewers: string[];
  appreciations: string[];
  comments: string[];
  reviews: string[];
  videos: string[];
  audios: string[];
  photos: string[];
  genres: string[];

  constructor(user: UserInterface) {
    this._id = user._id || '';
    this.active = user.active || true;
    this.avatar = user.avatar || '';
    this.email = user.email || '';
    this.username = user.username || '';
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.gender = user.gender || '';
    this.role = user.role || 'user';
    this.type = user.type || 'fan';
    this.position = user.position || '';
    this.city = user.city || '';
    this.country = user.country || '';
    this.groupName = user.groupName || '';
    this.website = user.website || '';
    this.dateOfBirth = user.dateOfBirth ? new Date(user.dateOfBirth) : undefined;
    this.joinDate = user.joinDate || new Date();
    this.biography = user.biography || '';
    this.location = user.location ? {
        country: new Country(user.location.country),
        city: new City(user.location.city)
      } : {
        country: new Country(),
        city: new City()
      };
    this.contacts = user.contacts || {phone: '', skype: '', hangouts: ''};
    this.socials = user.socials || {google: '', facebook: '', twitter: '', instagram: ''};
    this.statistics = user.statistics ||
      {
        likes: {
          liked: 0,
          likeUser: 0,
          likeShow: 0
        },
        viewers: 0,
        followers: 0,
        following: 0
      };
    this.shows = user.shows || {owned: 0, purchased: 0};
    this.viewers = user.viewers || [];
    this.appreciations = user.viewers || [];
    this.comments = user.comments || [];
    this.reviews = user.reviews || [];
    this.videos = user.videos || [];
    this.audios = user.audios || [];
    this.photos = user.photos || [];
    this.genres = user.genres || [];

    const typeUserLink = user.type === 'fan' ? RouterLinks.FanProfile : RouterLinks.ArtistProfile;
    this.profileUrl = `${environment.frontendPath}/${typeUserLink}?id=${this._id}`;
  }
}
