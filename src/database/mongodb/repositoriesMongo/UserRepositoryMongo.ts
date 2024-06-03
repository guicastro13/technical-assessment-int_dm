import { User } from '../../../entities/User';
import { UsersRepositoryI } from '../../repositoriesInterfaces/UsersRepositoryInterface';
import { UserModel } from '../schemas/schemas';

export class UserRepositoryMongo implements UsersRepositoryI {
  async save(user: User): Promise<User> {
    const userDocument = new UserModel(user);
    const savedUser = await userDocument.save();
    return new User(savedUser.toObject());
  }

  async getAll(): Promise<User[] | null> {
    const users = await UserModel.find();
    return users.map((userDoc) => new User(userDoc.toObject())) || null;
  }

  async getUserById(userId: string): Promise<User | null> {
    const userDocument = await UserModel.findOne({ id: userId });
    return userDocument ? new User(userDocument.toObject()) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userDocument = await UserModel.findOne({ email });
    return userDocument ? new User(userDocument.toObject()) : null;
  }

  async updateById(userId: string, updatedUser: User): Promise<User | null> {
    const updatedUserDocument = await UserModel.findOneAndUpdate({ id: userId }, updatedUser, { new: true });
    return updatedUserDocument ? new User(updatedUserDocument.toObject()) : null;
  }

  async deleteById(userId: string): Promise<void> {
    await UserModel.deleteOne({ id: userId });
  }
}
