import { UsersRepositoryI } from '../../database/repositoriesInterfaces/UsersRepositoryInterface';
import { User, UserAttributes } from '../../entities/User';
import { Conflict } from '../../errors/Conflict';

export class CreateUser {
  constructor(private usersRepo: UsersRepositoryI) {}

  async exec(attributes: UserAttributes) {
    if (attributes.id) {
      const hasUserWithId = await this.usersRepo.getUserById(attributes.id);
      if (hasUserWithId) throw new Conflict('Já existe um úsuario com esse ID');
    }

    if (attributes.email) {
      const hasUserWithId = await this.usersRepo.getUserByEmail(attributes.email);
      if (hasUserWithId) throw new Conflict('Já existe um úsuario com esse EMAIL');
    }

    const user = new User(attributes);
    return this.usersRepo.save(user);
  }
}
