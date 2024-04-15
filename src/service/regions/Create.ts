import { RegionsRepositoryI } from '../../database/repositoriesInterfaces/RegionsRepositoryInterface';
import { Region, RegionAttributes } from '../../entities/Region';

export class CreateRegion {
  constructor(private regionsRepo: RegionsRepositoryI) {}

  async exec(attributes: RegionAttributes) {
    const region = new Region(attributes);
    return this.regionsRepo.save(region);
  }
}
