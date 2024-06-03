import { RegionsRepositoryI } from '../../database/repositoriesInterfaces/RegionsRepositoryInterface';
import { Conflict } from '../../errors/Conflict';

export class GetRegionById {
  constructor(private regionsRepo: RegionsRepositoryI) {}

  async exec(regionId: string) {
    const region = await this.regionsRepo.getRegionById(regionId);
    if (region === null) throw new Conflict('Nenhum usuário encontrado com esse ID');
    return this.regionsRepo.getRegionById(regionId);
  }
}
