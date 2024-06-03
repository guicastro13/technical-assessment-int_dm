import { RegionsRepositoryI } from '../../database/repositoriesInterfaces/RegionsRepositoryInterface';
import { Coordinates } from '../../entities/Address';
import { Region } from '../../entities/Region';
import { GeoLocationDistance } from '../GeoLocationDistance';

export class GetAllRegionsCloseToCoordinate {
  constructor(
    private regionsRepo: RegionsRepositoryI,
    private geoLocationDistance: GeoLocationDistance,
  ) {}

  async exec(coordinates: Coordinates, howMuchCloseInKM: number) {
    if (isNaN(howMuchCloseInKM)) {
      howMuchCloseInKM = 10;
    }
    const regions = await this.regionsRepo.getRegionsNearby(coordinates, howMuchCloseInKM);
    if (!regions) return [];
    const closeRegions: Array<{ region: Region; distance: number }> = [];
    regions.forEach((region) => {
      const distance = this.geoLocationDistance.getDistance(coordinates, region.coordinates);
      closeRegions.push({ region, distance });
    });
    return closeRegions;
  }
}
