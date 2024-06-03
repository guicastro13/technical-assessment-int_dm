import { UsersRepositoryI } from '../../database/repositoriesInterfaces/UsersRepositoryInterface';
import { User } from '../../entities/User';
import { Conflict } from '../../errors/Conflict';

export class GetUserById {
  constructor(private usersRepo: UsersRepositoryI) {}

  async exec(userId: string): Promise<User | null> {
    const user = await this.usersRepo.getUserById(userId);
    if (user === null) throw new Conflict('Nenhum usuário encontrado com esse ID');
    return this.usersRepo.getUserById(userId);
  }
}
