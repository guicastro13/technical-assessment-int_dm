import { UsersRepositoryI } from '../../database/repositoriesInterfaces/UsersRepositoryInterface';

export class GetAllUsers {
  constructor(private usersRepo: UsersRepositoryI) {}

  async exec() {
    return this.usersRepo.getAll();
  }
}
