import { ZodError } from 'zod';
import { MemoryRegionRepository } from '../../../database/test/mockRepositories/MemoryRegionRepository';
import { Region } from '../../../entities/Region';
import { CreateRegion } from '../../../service/regions/Create';
import { DeleteRegion } from '../../../service/regions/Delete';
import { GetAllRegions } from '../../../service/regions/GetAllRegions';
import { GetRegionById } from '../../../service/regions/GetRegionById';
import { UpdaterRegion } from '../../../service/regions/Update';
import { HttpRequest, HttpResponse } from '../../HttpServer';
import { RegionController } from '../RegionController';
import { UserController } from '../UserController';
import { UpdaterUser } from '../../../service/user/Update';
import { DeleteUser } from '../../../service/user/Delete';
import { GetUserById } from '../../../service/user/GetUserById';
import { GetAllUsers } from '../../../service/user/GetAllUsers';
import { CreateUser } from '../../../service/user/Create';
import { MemoryUserRepository } from '../../../database/test/mockRepositories/MemoryUserRepository';
import { User } from '../../../entities/User';
import { GetRegionsCloseToCoordinateDiffUserId } from '../../../service/regions/GetRegionsCloseToCoordinateDiffUsarId';
import { GeoLocationDistance } from '../../../service/GeoLocationDistance';
import { GetAllRegionsCloseToCoordinate } from '../../../service/regions/GetAllRegionsCloseToCoordinate';
import { LoggerService } from '../../../helpers/Logger';
import { AxiosAdapter } from '../../../httpClient/Axios';
import { HereApiGeoLocationService } from '../../../service/GeoLocationService';

describe('Region Controller Teste', () => {
  let regionController: RegionController;
  let userController: UserController;
  let user: User;
  let requestCreateRegionWithSuccess: HttpRequest;
  let requestCreateOtherRegionWithSuccess: HttpRequest;

  const requestEmpty: HttpRequest = {
    headers: {},
  };

  type HttpResponseCustom = HttpResponse;

  const userCreator: HttpRequest = {
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

  const requestCreateRegionWithError: HttpRequest = {
    headers: {},
    body: {
      name: '',
      coordinates: null,
      userId: '',
    },
  };

  beforeAll(async () => {
    const usersRepository = new MemoryUserRepository();
    const logger = new LoggerService();
    const axios = new AxiosAdapter(logger);
    const geoLocationService = new HereApiGeoLocationService(axios);
    const createUser = new CreateUser(usersRepository, geoLocationService);
    const getAllUsers = new GetAllUsers(usersRepository);
    const getUserById = new GetUserById(usersRepository);
    const deleteUser = new DeleteUser(usersRepository);
    const updaterUser = new UpdaterUser(usersRepository, geoLocationService);
    const RegionsRepository = new MemoryRegionRepository();
    const createRegion = new CreateRegion(RegionsRepository, getUserById);
    const getAllRegions = new GetAllRegions(RegionsRepository);
    const getRegionById = new GetRegionById(RegionsRepository);
    const deleteRegion = new DeleteRegion(RegionsRepository);
    const updaterRegion = new UpdaterRegion(RegionsRepository);
    const geoLocationDistance = new GeoLocationDistance();
    const getRegionsCloseToCoordinateDiffUserId = new GetRegionsCloseToCoordinateDiffUserId(
      RegionsRepository,
      geoLocationDistance,
    );
    const getAllRegionsCloseToCoordinate = new GetAllRegionsCloseToCoordinate(RegionsRepository, geoLocationDistance);
    userController = new UserController(createUser, getAllUsers, getUserById, deleteUser, updaterUser);
    regionController = new RegionController(
      createRegion,
      getAllRegions,
      getRegionById,
      deleteRegion,
      updaterRegion,
      getRegionsCloseToCoordinateDiffUserId,
      getAllRegionsCloseToCoordinate,
    );
    const response = await userController.register(userCreator);
    const { user: responseUser } = response.body as { user: User };
    user = responseUser;

    requestCreateRegionWithSuccess = {
      headers: {},
      body: {
        name: 'Region 1',
        coordinates: { latitude: 10.0, longitude: 20.0 },
        userId: user.id,
      },
    };

    requestCreateOtherRegionWithSuccess = {
      headers: {},
      body: {
        name: 'Region 2',
        coordinates: { latitude: 15.0, longitude: 25.0 },
        userId: user.id,
      },
    };
  });

  it('Deve criar uma região', async () => {
    const response = await regionController.create(requestCreateRegionWithSuccess);
    expect(response.statusCode).toBe(201);
  });

  it('Não deve criar uma região com campos incompletos', async () => {
    await expect(async () => await regionController.create(requestCreateRegionWithError)).rejects.toThrow(ZodError);
  });

  it('Deve retornar todas as regiões', async () => {
    const response = await regionController.getAll(requestEmpty);
    expect(response.statusCode).toBe(200);
  });

  it('Deve retornar uma região por UUID', async () => {
    await regionController.create(requestCreateRegionWithSuccess);
    const responseGetAll: HttpResponseCustom = await regionController.getAll(requestEmpty);
    const { regions } = responseGetAll.body as { regions: Array<Region> };
    const requestRegionById: HttpRequest = { headers: {}, params: { region_id: regions[0].id } };
    const response = await regionController.getById(requestRegionById);
    expect(response.statusCode).toBe(200);
  });

  it('Deve atualizar uma região', async () => {
    const responseGetAll = await regionController.getAll(requestEmpty);
    const { regions } = responseGetAll.body as { regions: Array<Region> };
    const regionId = regions[0].id;
    const request: HttpRequest = {
      headers: {},
      params: { region_id: regionId },
      body: {
        name: 'Updated Region',
        coordinates: { latitude: 30.0, longitude: 40.0 },
      },
    };
    const response = await regionController.update(request);
    expect(response.statusCode).toBe(200);
  });

  it('Deve excluir uma região', async () => {
    const responseGetAll = await regionController.getAll(requestEmpty);
    const { regions } = responseGetAll.body as { regions: Array<Region> };
    const regionId = regions[0].id;
    const request: HttpRequest = { headers: {}, params: { region_id: regionId } };
    const response = await regionController.delete(request);
    expect(response.statusCode).toBe(204);
  });
});
