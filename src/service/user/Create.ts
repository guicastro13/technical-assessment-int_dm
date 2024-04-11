import { UsersRepositoryI } from '../../database/repositories/UsersRepositoryInterface';
import { User, UserAttributes } from '../../entities/User';

export class CreateUser {
  constructor(private usersRepo: UsersRepositoryI) {}

  async exec(attributes: UserAttributes) {
    const user = new User(attributes);
    return this.usersRepo.save(user);
  }
}
