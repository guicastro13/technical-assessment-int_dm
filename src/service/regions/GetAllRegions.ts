import { RegionsRepositoryI } from '../../database/repositoriesInterfaces/RegionsRepositoryInterface';

export class GetAllRegions {
  constructor(private regionsRepo: RegionsRepositoryI) {}

  async exec() {
    return this.regionsRepo.getAll();
  }
}
