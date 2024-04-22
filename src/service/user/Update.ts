import { UsersRepositoryI } from '../../database/repositoriesInterfaces/UsersRepositoryInterface';
import { User, UserAttributes, UserAttributesUpdate } from '../../entities/User';
import { Conflict } from '../../errors/Conflict';

export class UpdaterUser {
  constructor(private usersRepo: UsersRepositoryI) {}

  async exec(userId: string, updatederUser: UserAttributesUpdate): Promise<User | null> {
    const user = await this.usersRepo.getUserById(userId);
    if (user === null) throw new Conflict("Nenhum usuário encontrado com esse ID")
    const { address, coordinates, email, name } = updatederUser;
    const newUser = new User({
      id: userId,
      name: name ? name : user.name,
      email: email ? email : user.email,
      coordinates: coordinates ? coordinates : user.coordinates,
      address: address ? address : user.address,
      updatedAt: new Date(),
    });
    return this.usersRepo.updateById(userId, newUser);
  }
}
