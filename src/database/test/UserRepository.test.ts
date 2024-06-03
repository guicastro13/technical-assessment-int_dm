import { User } from '../../entities/User';
import { MemoryUserRepository } from './mockRepositories/MemoryUserRepository';

describe('MemoryUserRepository', () => {
  let userRepository: MemoryUserRepository;
  let user: User;
  beforeEach(() => {
    userRepository = new MemoryUserRepository();
    user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'City',
        state: 'State',
        country: 'Country',
        zipCode: '12345',
      },
    });
  });

  test('save', async () => {
    const createdUser = await userRepository.save(user);
    expect(createdUser).toEqual(user);
  });

  test('getUserByEmail', async () => {
    await userRepository.save(user);
    const retrievedUser = await userRepository.getUserByEmail('john@example.com');
    expect(retrievedUser).toEqual(user);
  });

  test('update', async () => {
    await userRepository.save(user);
    const userToUpdate = await userRepository.getUserById(user.id);
    userToUpdate!.name = 'Juliano';
    await userRepository.updateById(userToUpdate!.id, userToUpdate!);
    const retrievedUser = await userRepository.getUserById(user.id);
    expect(retrievedUser!.name).toEqual('Juliano');
  });

  test('delete', async () => {
    await userRepository.save(user);
    await userRepository.deleteById(user.id!);
    const retrievedUser = await userRepository.getUserByEmail('john@example.com');
    expect(retrievedUser).toBeNull();
  });
});
