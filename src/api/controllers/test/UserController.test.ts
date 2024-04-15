import { ZodError } from 'zod';
import { MemoryUserRepository } from '../../../database/test/mockRepositories/MemoryUserRepository';
import { CreateUser } from '../../../service/user/Create';
import { DeleteUser } from '../../../service/user/Delete';
import { GetAllUsers } from '../../../service/user/GetAllUsers';
import { GetUserById } from '../../../service/user/GetUserById';
import { UpdaterUser } from '../../../service/user/Update';
import { HttpRequest, HttpResponse } from '../../HttpServer';
import { UserController } from '../UserController';
import { User } from '../../../entities/User';

describe('User Controller Teste', () => {
  let userController: UserController;

  const requestEmpty: HttpRequest = {
    headers: {},
  };

  type HttpResponseCustom = HttpResponse;

  const requestCreateUserWithSuccess: HttpRequest = {
    headers: {},
    body: {
      name: 'Usuario 1',
      email: 'usuario_1@example.com',
      address: {
        street: '123 Main St',
        city: 'City',
        state: 'State',
        country: 'Country',
        zipCode: '12345',
      },
    },
  };
  const requestCreateOtherUserWithSuccess: HttpRequest = {
    headers: {},
    body: {
      name: 'Usuario 2',
      email: 'usuario_2@example.com',
      address: {
        street: '123 Main St',
        city: 'City',
        state: 'State',
        country: 'Country',
        zipCode: '12345',
      },
    },
  };
  const requestCreateUserWithError: HttpRequest = {
    headers: {},
    body: {
      name: 'Test User',
      email: 'test@example.com',
      address: '123 Test St',
      coordinates: { latitude: 0, longitude: 0 },
    },
  };
  beforeAll(() => {
    const usersRepository = new MemoryUserRepository();
    const createUser = new CreateUser(usersRepository);
    const getAllUsers = new GetAllUsers(usersRepository);
    const getUserById = new GetUserById(usersRepository);
    const deleteUser = new DeleteUser(usersRepository);
    const updaterUser = new UpdaterUser(usersRepository);
    userController = new UserController(createUser, getAllUsers, getUserById, deleteUser, updaterUser);
  });

  it('Deve criar um usuário', async () => {
    const response = await userController.register(requestCreateUserWithSuccess);
    expect(response.statusCode).toBe(201);
  });

  it('Não deve criar um usuário com campos incompletos', async () => {
    await expect(async () => await userController.register(requestCreateUserWithError)).rejects.toThrow(ZodError);
  });

  it('Deve retornar todos os usuários', async () => {
    const response = await userController.getAll(requestEmpty);
    expect(response.statusCode).toBe(200);
  });

  it('Deve retornar um usuário por UUID', async () => {
    await userController.register(requestCreateOtherUserWithSuccess);
    const responseGetAll: HttpResponseCustom = await userController.getAll(requestEmpty);
    const { users } = responseGetAll.body as { users: Array<User> };
    const requestUserById: HttpRequest = { headers: {}, params: { user_id: users[0].id } };
    const response = await userController.getById(requestUserById);
    expect(response.statusCode).toBe(200);
  });

  it('Deve atualizar um usuário', async () => {
    const responseGetAll = await userController.getAll(requestEmpty);
    const { users } = responseGetAll.body as { users: Array<User> };
    const userId = users[0].id;
    const request: HttpRequest = {
      headers: {},
      params: { user_id: userId },
      body: {
        name: 'Updated User',
        email: 'updated@example.com',
      },
    };
    const response = await userController.update(request);
    expect(response.statusCode).toBe(200);
  });

  it('Deve excluir um usuário', async () => {
    const responseGetAll = await userController.getAll(requestEmpty);
    const { users } = responseGetAll.body as { users: Array<User> };
    const userId = users[0].id;
    const request: HttpRequest = { headers: {}, params: { user_id: userId } };
    const response = await userController.delete(request);
    expect(response.statusCode).toBe(204);
  });
});
