import { UsersRepositoryI } from '../../database/repositories/UsersRepositoryInterface';

export class GetAllUsers {
  constructor(private usersRepo: UsersRepositoryI) {}

  async exec() {
    return this.usersRepo.getAll();
  }
}
