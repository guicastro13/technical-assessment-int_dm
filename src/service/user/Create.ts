import { UsersRepositoryI } from '../../database/repositoriesInterfaces/UsersRepositoryInterface';
import { Address, Coordinates, GeoLocationService } from '../../entities/Address';
import { User, UserAttributes } from '../../entities/User';
import { Conflict } from '../../errors/Conflict';

export class CreateUser {
  constructor(
    private usersRepo: UsersRepositoryI,
    private geoLocation: GeoLocationService,
  ) {}

  async exec(attributes: UserAttributes) {
    if (attributes.id) {
      const hasUserWithId = await this.usersRepo.getUserById(attributes.id);
      if (hasUserWithId) throw new Conflict('Já existe um úsuario com esse ID');
    }

    if (attributes.email) {
      const hasUserWithId = await this.usersRepo.getUserByEmail(attributes.email);
      if (hasUserWithId) throw new Conflict('Já existe um úsuario com esse EMAIL');
    }

    if (attributes.coordinates) {
      attributes.address = await this.geoLocation.getAddressFromCoordinates(attributes.coordinates);
    } else if (attributes.address) {
      attributes.coordinates = await this.geoLocation.getCoordinatesFromAddress(attributes.address);
    }

    const user = new User(attributes);
    return this.usersRepo.save(user);
  }
}
