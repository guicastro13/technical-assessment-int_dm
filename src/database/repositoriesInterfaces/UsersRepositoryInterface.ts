import { User } from '../../entities/User';

export interface UsersRepositoryI {
  save(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(userId: string): Promise<User | null>;
  getAll(): Promise<Array<User> | null>;
  updateById(userId: string, updatedUser: User): Promise<User | null>;
  deleteById(userId: string): Promise<void>;
}
