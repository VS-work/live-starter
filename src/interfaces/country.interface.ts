export interface Country {
  id: string;
  name: string;
  sortname: string;
  _id: string;
}

export interface City {
  _id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  alias: number;
}

export interface Location {
  countries: Country[],
  cities?: City[]
};
