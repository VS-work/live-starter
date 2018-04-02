import { Country, City, Location } from '../shared/models';

interface Contacts {
  phone: string
}

interface Socials {
  google: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

export class ChangableData {
  username = '';
  firstName = '';
  lastName = '';
  dateOfBirth: Date;
  email = '';
  biography = '';
  contacts: Contacts = {phone: ''};
  socials: Socials = {
    google: '',
    facebook: '',
    twitter: '',
    instagram: ''
  };
  location?: Location = {
    country: new Country(),
    city: new City()
  };

  constructor(data?: ChangableData) {
    if (!data) {
      return undefined;
    }

    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
    this.email = data.email;
    this.biography = data.biography;
    this.contacts.phone = data.contacts.phone;
    this.socials = {...data.socials};
    this.location = {
      country: new Country(data.location.country),
      city: new City(data.location.city)
    }
  }
}
