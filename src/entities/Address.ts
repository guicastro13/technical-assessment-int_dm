export interface CoordinatesAttributes {
  latitude: number;
  longitude: number;
}

export interface AddressAttributes {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export class Coordinates {
  latitude: number;
  longitude: number;
  constructor(attributes: CoordinatesAttributes) {
    this.latitude = attributes.latitude;
    this.longitude = attributes.longitude;
  }
}

export class Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  constructor(attributes: AddressAttributes) {
    this.city = attributes.city;
    this.state = attributes.state;
    this.street = attributes.street;
    this.country = attributes.country;
    this.zipCode = attributes.zipCode;
  }
}

export interface GeoLocationService {
  getAddressFromCoordinates(coordinates: Coordinates): Promise<Address | null>;
  getCoordinatesFromAddress(address: Address): Promise<Coordinates | null>;
}
