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
    const userToUpdate = await userRepository.getUserByEmail(user.email);
    userToUpdate!.name = 'Juliano';
    await userRepository.update(userToUpdate!.email, userToUpdate!);
    const retrievedUser = await userRepository.getUserByEmail('john@example.com');
    expect(retrievedUser!.name).toEqual('Juliano');
  });

  test('delete', async () => {
    await userRepository.save(user);
    await userRepository.delete(user.id!);
    const retrievedUser = await userRepository.getUserByEmail('john@example.com');
    expect(retrievedUser).toBeNull();
  });
});
