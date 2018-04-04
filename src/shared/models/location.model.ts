export class Country {
  name = '';
  sortname = '';

  constructor(country?: Country) {
    if (!country) {
      return undefined;
    }

    this.name = country.name;
    this.sortname = country.sortname;
  }
}

export class City {
  name = '';
  country = '';
  lat = '';
  lng = '';

  constructor(city?: City) {
    if (!city) {
      return undefined;
    }

    this.name = city.name;
    this.country = city.country;
    this.lat = city.lat;
    this.lng = city.lng;
  }
}

export interface Location {
  country: Country;
  city: City;
};
