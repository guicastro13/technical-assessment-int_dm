import { UsersRepositoryI } from '../../database/repositories/UsersRepositoryInterface';

export class DeleteUser {
  constructor(private usersRepo: UsersRepositoryI) {}

  async exec(userId: string) {
    await this.usersRepo.delete(userId);
  }
}
