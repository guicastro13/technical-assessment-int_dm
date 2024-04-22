import { MemoryUserRepository } from '../../../database/test/mockRepositories/MemoryUserRepository';
import { CreateUser } from '../../../service/user/Create';
import { DeleteUser } from '../../../service/user/Delete';
import { GetAllUsers } from '../../../service/user/GetAllUsers';
import { GetUserById } from '../../../service/user/GetUserById';
import { UpdaterUser } from '../../../service/user/Update';
import { HttpRequest, HttpResponse } from '../../HttpServer';
import { UserController } from '../UserController';
import { User } from '../../../entities/User';
import { LoggerService } from '../../../helpers/Logger';
import { AxiosAdapter } from '../../../httpClient/Axios';
import { HereApiGeoLocationService } from '../../../service/GeoLocationService';
import { HttpError } from '../../../errors/HttpError';

describe('User Controller Test', () => {
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
        city: 'Boston',
        country: 'USA',
        state: 'MA',
        street: 'Washington St',
        zipCode: '02108-4603',
      },
    },
  };
  const requestCreateOtherUserWithSuccess: HttpRequest = {
    headers: {},
    body: {
      name: 'Usuario 2',
      email: 'usuario_2@example.com',
      address: {
        city: 'Boston',
        country: 'USA',
        state: 'MA',
        street: 'Washington St',
        zipCode: '02108-4603',
      },
    },
  };
  const request3WithSuccess: HttpRequest = {
    headers: {},
    body: {
      name: 'Usuario 3',
      email: 'usuario_3@example.com',
      address: {
        city: 'Boston',
        country: 'USA',
        state: 'MA',
        street: 'Washington St',
        zipCode: '02108-4603',
      },
    },
  };
  const requestCreateUserWithError: HttpRequest = {
    headers: {},
    body: {
      name: 'Test User',
      email: 'test@example.com',
      address: {
        city: 'Boston',
        country: 'USA',
        state: 'MA',
        street: 'Washington St',
        zipCode: '02108-4603',
      },
      coordinates: { latitude: 22.40083454639946, longitude: -47.56297832084271 },
    },
  };
  beforeAll(() => {
    const usersRepository = new MemoryUserRepository();
    const logger = new LoggerService();
    const axios = new AxiosAdapter(logger);
    const geoLocationService = new HereApiGeoLocationService(axios);
    const createUser = new CreateUser(usersRepository, geoLocationService);
    const getAllUsers = new GetAllUsers(usersRepository);
    const getUserById = new GetUserById(usersRepository);
    const deleteUser = new DeleteUser(usersRepository);
    const updaterUser = new UpdaterUser(usersRepository, geoLocationService);
    userController = new UserController(createUser, getAllUsers, getUserById, deleteUser, updaterUser);
  });

  it('should must create a user', async () => {
    const response = await userController.register(requestCreateUserWithSuccess);
    expect(response.statusCode).toBe(201);
  });

  it('should not create a user with incomplete fields', async () => {
    await expect(async () => await userController.register(requestCreateUserWithError)).rejects.toThrow(HttpError);
  });

  it('should return all users', async () => {
    const response = await userController.getAll(requestEmpty);
    expect(response.statusCode).toBe(200);
  });

  it('should return a user by UUID', async () => {
    await userController.register(requestCreateOtherUserWithSuccess);
    const responseGetAll: HttpResponseCustom = await userController.getAll(requestEmpty);
    const { users } = responseGetAll.body as { users: Array<User> };
    const requestUserById: HttpRequest = { headers: {}, params: { user_id: users[0].id } };
    const response = await userController.getById(requestUserById);
    expect(response.statusCode).toBe(200);
  });

  it('should update a user', async () => {
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

  it('should give an error when trying to update with address and coordinates', async () => {
    const responseGetAll = await userController.getAll(requestEmpty);
    const { users } = responseGetAll.body as { users: Array<User> };
    const userId = users[0].id;
    const request: HttpRequest = {
      headers: {},
      params: { user_id: userId },
      body: {
        name: 'Updated User',
        email: 'updated@example.com',
        address: {
          city: 'Boston',
          country: 'USA',
          state: 'MA',
          street: 'Washington St',
          zipCode: '02108-4603',
        },
        coordinates: { latitude: 22.40083454639946, longitude: -47.56297832084271 },
      },
    };
    expect(async () => await userController.update(request)).rejects.toThrow(HttpError);
  });
  it('should delete a user', async () => {
    const responseGetAll = await userController.getAll(requestEmpty);
    const { users } = responseGetAll.body as { users: Array<User> };
    const userId = users[0].id;
    const request: HttpRequest = { headers: {}, params: { user_id: userId } };
    const response = await userController.delete(request);
    expect(response.statusCode).toBe(204);
  });
});
