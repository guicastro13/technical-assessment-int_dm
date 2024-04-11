import { RegionsRepositoryI } from '../../database/repositories/RegionsRepositoryInterface';

export class GetAllRegions {
  constructor(private regionsRepo: RegionsRepositoryI) {}

  async exec() {
    return this.regionsRepo.getAll();
  }
}
