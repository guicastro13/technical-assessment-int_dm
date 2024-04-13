import { Address, Coordinates } from "../entities/Address"
import { AxiosAdapter } from "../httpClient/Axios";
import { GoogleMapsGeoLocationService } from "./GeoLocationService"

describe("Geo Location Service", () => {
    let geoLocation: GoogleMapsGeoLocationService;
    const address = new Address({
        city: "Boston",
        country: "USA",
        state: "MA",
        street: "Washington St",
        zipCode: "02108-4603"
    })
    const coordinates = new Coordinates({
        latitude: 42.35815,
        longitude: -71.05788
    })
    beforeAll(()=>{
        const adapter = new AxiosAdapter()
        geoLocation = new GoogleMapsGeoLocationService(adapter)
    })
    it("Deve extrair a coordenada através do endereço", async ()=>{
        const coordinate = await geoLocation.getCoordinatesFromAddress(address);
        expect(coordinate).toBeTruthy()
    })

    it("Deve receber um endereço através de uma coordenada", async () => {
        const addres = await geoLocation.getAddressFromCoordinates(coordinates);
        expect(addres).toBeTruthy()
    })
})