import { Address, Coordinates, GeoLocationService } from '../entities/Address';
import { HttpClient } from '../httpClient/Axios';
import { ResponseData } from '../httpClient/geoLocationTypeRequest';

export class HereApiGeoLocationService implements GeoLocationService {
  private _apiKey = process.env.GEO_HEREAPI_KEY;
  private baseUrlAddress = 'https://geocode.search.hereapi.com/v1/geocode';
  private baseUrlCordenates = 'https://revgeocode.search.hereapi.com/v1/revgeocode';

  constructor(private axios: HttpClient) {}

  async getAddressFromCoordinates(coordinates: Coordinates): Promise<Address | null> {
    const { latitude, longitude } = coordinates;
    const result = await this.axios.get<ResponseData>(
      `${this.baseUrlCordenates}?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${this._apiKey}`,
    );
    if (result == null) return null;
    return {
      city: result.items[0].address.city,
      country: result.items[0].address.county,
      state: result.items[0].address.state,
      street: result.items[0].address.street,
      zipCode: result.items[0].address.postalCode,
    } as Address;
  }

  async getCoordinatesFromAddress(address: Address): Promise<Coordinates | null> {
    const { city, country, state, street, zipCode } = address;
    const result = await this.axios.get<ResponseData>(
      `${this.baseUrlAddress}?q=+${city}+${country}+${state}+${street}+${zipCode}&apiKey=${this._apiKey}`,
    );
    if (result == null) return null;
    return {
      latitude: result.items[0].access[0].lat,
      longitude: result.items[0].access[0].lng,
    } as Coordinates;
  }
}
