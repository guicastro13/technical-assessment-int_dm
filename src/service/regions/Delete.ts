import { RegionsRepositoryI } from '../../database/repositories/RegionsRepositoryInterface';

export class DeleteRegion {
  constructor(private regionsRepo: RegionsRepositoryI) {}

  async exec(userId: string) {
    return this.regionsRepo.deleteById(userId);
  }
}
