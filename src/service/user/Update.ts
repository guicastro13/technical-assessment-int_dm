import { UsersRepositoryI } from '../../database/repositoriesInterfaces/UsersRepositoryInterface';
import { GeoLocationService } from '../../entities/Address';
import { User, UserAttributes, UserAttributesUpdate } from '../../entities/User';
import { Conflict } from '../../errors/Conflict';

export class UpdaterUser {
  constructor(
    private usersRepo: UsersRepositoryI,
    private geoLocation: GeoLocationService,
  ) {}

  async exec(userId: string, updatederUser: UserAttributesUpdate): Promise<User | null> {
    const user = await this.usersRepo.getUserById(userId);
    if (user === null) throw new Conflict('Nenhum usuário encontrado com esse ID');

    if (updatederUser.coordinates) {
      updatederUser.address = await this.geoLocation.getAddressFromCoordinates(updatederUser.coordinates);
    } else if (updatederUser.address) {
      updatederUser.coordinates = await this.geoLocation.getCoordinatesFromAddress(updatederUser.address);
    }

    const newUserAttributes: UserAttributes = {
      id: user.id,
      name: updatederUser.name ?? user.name,
      email: updatederUser.email ?? user.email,
      address: updatederUser.address,
      coordinates: updatederUser.coordinates,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };
    const newUser = new User(newUserAttributes);
    return this.usersRepo.updateById(userId, newUser);
  }
}
