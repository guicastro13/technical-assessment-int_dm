import { RegionsRepositoryI } from '../../database/repositoriesInterfaces/RegionsRepositoryInterface';
import { Region, RegionAttributesUpdate } from '../../entities/Region';
import { Conflict } from '../../errors/Conflict';

export class UpdaterRegion {
  constructor(private regionsRepo: RegionsRepositoryI) {}

  async exec(regionId: string, updatederRegions: RegionAttributesUpdate): Promise<Region | null> {
    const region = await this.regionsRepo.getRegionById(regionId);
    if (region === null) throw new Conflict("Nenhuma região encontrada com esse ID")
    const { coordinates, name } = updatederRegions;
    const newRegion = new Region({
      id: regionId,
      userId: region.userId,
      name: name ? name : region.name,
      coordinates: coordinates ? coordinates : region.coordinates,
      updatedAt: new Date(),
    });
    return this.regionsRepo.updateById(regionId, newRegion);
  }
}
