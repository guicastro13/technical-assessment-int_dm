import { UsersRepositoryI } from '../../database/repositoriesInterfaces/UsersRepositoryInterface';

export class DeleteUser {
  constructor(private usersRepo: UsersRepositoryI) {}

  async exec(userId: string) {
    await this.usersRepo.deleteById(userId);
  }
}
