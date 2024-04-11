import { RegionsRepositoryI } from '../../database/repositories/RegionsRepositoryInterface';
import { Region, RegionAttributesUpdate } from '../../entities/Region';

export class UpdaterRegion {
  constructor(private regionsRepo: RegionsRepositoryI) {}
  
  async exec(regionId: string, updatederRegions: RegionAttributesUpdate): Promise<Region | null> {
    const region = await this.regionsRepo.getRegionById(regionId);
    if (region === null) return null;
    const { coordinates, name } = updatederRegions;
    const newRegion = new Region({
      id: regionId,
      userId: region.userId,
      name: name ? name : region.name,
      coordinates: coordinates ? coordinates : region.coordinates,
      updatedAt: new Date(),
    });
    return this.regionsRepo.update(regionId, newRegion);
  }
}
