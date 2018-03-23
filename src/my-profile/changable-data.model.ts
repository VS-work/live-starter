interface Contacts {
  phone: string
};

interface Socials {
  google: string;
  facebook: string;
  twitter: string;
};

export class ChangableData {
  username = '';
  email = '';
  biography = '';
  contacts: Contacts = {phone: ''};
  socials: Socials = {
    google: '',
    facebook: '',
    twitter: ''
  };

  constructor(data?: ChangableData) {
    if (!data) {
      return undefined;
    }

    this.username = data.username;
    this.email = data.email;
    this.biography = data.biography;
    this.contacts.phone = data.contacts.phone;
    this.socials = {...data.socials};

  }
}
