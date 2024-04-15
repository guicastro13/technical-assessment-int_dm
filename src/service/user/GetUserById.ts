import { UsersRepositoryI } from '../../database/repositoriesInterfaces/UsersRepositoryInterface';
import { User } from '../../entities/User';

export class GetUserById {
  constructor(private usersRepo: UsersRepositoryI) {}

  async exec(userId: string): Promise<User | null> {
    return this.usersRepo.getUserById(userId);
  }
}
