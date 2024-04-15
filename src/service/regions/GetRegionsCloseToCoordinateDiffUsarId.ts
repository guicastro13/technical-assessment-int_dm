import { RegionsRepositoryI } from '../../database/repositoriesInterfaces/RegionsRepositoryInterface';
import { Coordinates } from '../../entities/Address';
import { Region } from '../../entities/Region';
import { GeoLocationDistance } from '../GeoLocationDistance';

export class GetRegionsCloseToCoordinateDiffUserId {
  constructor(
    private regionsRepo: RegionsRepositoryI,
    private geoLocationDistance: GeoLocationDistance,
  ) {}

  async exec(coordinates: Coordinates, userId: string, howMuchCloseInKM?: number) {
    if (!userId) return [];
    const regions = await this.regionsRepo.getAll();
    if (!regions) return [];

    const closeRegions: Array<{ region: Region; distance: number }> = [];

    regions.forEach((region) => {
      const distance = this.geoLocationDistance.getDistance(coordinates, region.coordinates);
      if ((howMuchCloseInKM === undefined || distance <= howMuchCloseInKM) && region.userId != userId) {
        closeRegions.push({ region, distance });
      }
    });

    return closeRegions;
  }
}
