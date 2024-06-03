import { User } from '../../../entities/User';
import { UsersRepositoryI } from '../../repositoriesInterfaces/UsersRepositoryInterface';

export class MemoryUserRepository implements UsersRepositoryI {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map<string, User>();
  }

  async save(user: User): Promise<User> {
    const instance = new User(user);
    this.users.set(user.id, instance);
    return instance;
  }

  async getAll(): Promise<Array<User> | null> {
    return Array.from(this.users.values()) || null;
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = this.users.get(userId);
    return user ? new User(user) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const [, user] of this.users) {
      if (user.email === email) {
        return new User(user);
      }
    }
    return null;
  }

  async updateById(userId: string, updaterUser: User): Promise<User | null> {
    if (this.users.get(userId)) {
      const updatedUser = new User(updaterUser);
      this.users.set(userId, updatedUser);
      return updatedUser;
    }
    return null;
  }

  async deleteById(userId: string): Promise<void> {
    this.users.delete(userId);
  }
}
