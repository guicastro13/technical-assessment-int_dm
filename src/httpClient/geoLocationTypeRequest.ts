export interface ResponseData {
  items: Item[];
}

interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  county: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
  houseNumber: string;
}

interface Position {
  lat: number;
  lng: number;
}

interface Access {
  lat: number;
  lng: number;
}

interface MapView {
  west: number;
  south: number;
  east: number;
  north: number;
}

interface FieldScore {
  city: number;
  streets: number[];
  houseNumber: number;
}

interface Scoring {
  queryScore: number;
  fieldScore: FieldScore;
}

interface Item {
  title: string;
  id: string;
  resultType: string;
  houseNumberType: string;
  address: Address;
  position: Position;
  access: Access[];
  mapView: MapView;
  scoring: Scoring;
}
