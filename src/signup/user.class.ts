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
  joinDate?: Date;
  biography?: string;
  contacts?: {
    phone: string;
    skype: string;
    hangouts: string;
  };
  socials?: {
    google: string;
    facebook: string;
    twitter: string;
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
  joinDate: Date;
  biography: string;
  contacts: {
    phone: string;
    skype: string;
    hangouts: string;
  };
  socials: {
    google: string;
    facebook: string;
    twitter: string;
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
    this.type = user.type || '';
    this.position = user.position || '';
    this.city = user.city || '';
    this.country = user.country || '';
    this.groupName = user.groupName || '';
    this.website = user.website || '';
    this.joinDate = user.joinDate || new Date();
    this.biography = user.biography || '';
    this.contacts = user.contacts || {phone: '', skype: '', hangouts: ''};
    this.socials = user.socials || {google: '', facebook: '', twitter: ''};
    this.viewers = user.viewers || [];
    this.appreciations = user.viewers || [];
    this.comments = user.comments || [];
    this.reviews = user.reviews || [];
    this.videos = user.videos || [];
    this.audios = user.audios || [];
    this.photos = user.photos || [];
    this.genres = user.genres || [];
  }
}
