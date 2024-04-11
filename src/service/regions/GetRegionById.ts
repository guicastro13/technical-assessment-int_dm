import { RegionsRepositoryI } from '../../database/repositories/RegionsRepositoryInterface';

export class GetRegionById {
  constructor(private regionsRepo: RegionsRepositoryI) {}

  async exec(regionId: string) {
    return this.regionsRepo.getRegionById(regionId);
  }
}
