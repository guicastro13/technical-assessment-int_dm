import { RegionsRepositoryI } from '../../database/repositoriesInterfaces/RegionsRepositoryInterface';

export class DeleteRegion {
  constructor(private regionsRepo: RegionsRepositoryI) {}

  async exec(userId: string) {
    return this.regionsRepo.deleteById(userId);
  }
}
