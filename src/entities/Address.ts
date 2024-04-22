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
    if (attributes.longitude < -180.0 || attributes.longitude > 180.0) {
      throw new Error('Longitude deve estar entre -180 e 180');
    }
    if (attributes.latitude < -90.0 || attributes.latitude > 90.0) {
      throw new Error('Latitude deve estar entre -90 e 90');
    }
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
