import { User } from '../../../entities/User';
import { UsersRepositoryI } from '../../repositories/UsersRepositoryInterface';

export class MemoryUserRepository implements UsersRepositoryI {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map<string, User>();
  }

  async save(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async getAll(): Promise<Array<User> | null> {
    return Array.from(this.users.values());
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.users.get(userId) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const [, user] of this.users) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async update(email: string, updatedUser: User): Promise<User | null> {
    if (this.users.has(email)) {
      this.users.set(email, updatedUser);
      return updatedUser;
    }
    return null;
  }

  async delete(userId: string): Promise<void> {
    this.users.delete(userId);
  }
}
