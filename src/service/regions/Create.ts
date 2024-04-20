import { RegionsRepositoryI } from '../../database/repositoriesInterfaces/RegionsRepositoryInterface';
import { Region, RegionAttributes } from '../../entities/Region';
import { Conflict } from '../../errors/Conflict';
import { GetUserById } from '../user/GetUserById';

export class CreateRegion {
  constructor(
    private regionsRepo: RegionsRepositoryI,
    private getUserById: GetUserById
  ) {}

  async exec(attributes: RegionAttributes) {
    const user = await this.getUserById.exec(attributes.userId)
    if(!user) throw new Conflict("Não foi encontrado nenhum USER o ID forncenido")

    const region = new Region(attributes);
    return this.regionsRepo.save(region);
  }
}
