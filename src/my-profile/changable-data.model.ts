interface Contacts {
  phone: string
};

interface Socials {
  google: string;
  facebook: string;
  twitter: string;
  instagram: string;
};

export class ChangableData {
  username = '';
  firstName = '';
  lastName = '';
  birthday: Date;
  email = '';
  biography = '';
  contacts: Contacts = {phone: ''};
  socials: Socials = {
    google: '',
    facebook: '',
    twitter: '',
    instagram: ''
  };

  constructor(data?: ChangableData) {
    if (!data) {
      return undefined;
    }

    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.birthday = data.birthday;
    this.email = data.email;
    this.biography = data.biography;
    this.contacts.phone = data.contacts.phone;
    this.socials = {...data.socials};

  }
}
