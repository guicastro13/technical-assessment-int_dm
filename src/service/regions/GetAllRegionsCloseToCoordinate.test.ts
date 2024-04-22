import { MemoryRegionRepository } from '../../database/test/mockRepositories/MemoryRegionRepository';
import { MemoryUserRepository } from '../../database/test/mockRepositories/MemoryUserRepository';
import { Coordinates } from '../../entities/Address';
import { User, UserAttributes } from '../../entities/User';
import { GeoLocationDistance } from '../GeoLocationDistance';
import { CreateUser } from '../user/Create';
import { GetAllRegionsCloseToCoordinate } from './GetAllRegionsCloseToCoordinate';
import { CreateRegion } from './Create';
import { GetUserById } from '../user/GetUserById';
import { LoggerService } from '../../helpers/Logger';
import { AxiosAdapter } from '../../httpClient/Axios';
import { HereApiGeoLocationService } from '../GeoLocationService';

describe('Get All Regions Close to Coordinate', () => {
  let getAllRegionsClose: GetAllRegionsCloseToCoordinate;
  let user_2: User;
  // diferença de 950 m
  // -22.40083454639946, -47.56297832084271
  // -22.392504686710215, -47.565024241120355

  // 21.64 Km
  // -22.545298697864474, -47.42180754266027
  // -22.400830790167916, -47.562983198639216

  // PESQUISA
  const pesquisa: Coordinates = {
    latitude: -22.35109901202295,
    longitude: -47.3671708705683,
  };

  const coordinateA1: Coordinates = {
    latitude: -22.40083454639946,
    longitude: -47.56297832084271,
  };

  const coordinateA2: Coordinates = {
    latitude: -22.392504686710215,
    longitude: -47.565024241120355,
  };

  const coordinateB1: Coordinates = {
    latitude: -22.545298697864474,
    longitude: -47.42180754266027,
  };

  const coordinateB2: Coordinates = {
    latitude: -22.400830790167916,
    longitude: -47.562983198639216,
  };

  const userValidA1: UserAttributes = {
    name: 'John Doe',
    email: 'john1@example.com',
    coordinates: coordinateA1,
    createdAt: new Date(),
  };

  const otherUserA2: UserAttributes = {
    name: 'Junior Goa',
    email: 'junior2@example.com',
    coordinates: coordinateA2,
    createdAt: new Date(),
  };

  beforeAll(async () => {
    const userRepo = new MemoryUserRepository();

    const logger = new LoggerService();
    const axios = new AxiosAdapter(logger);
    const regionsRepo = new MemoryRegionRepository();
    const geoLocationService = new HereApiGeoLocationService(axios);
    const createUser = new CreateUser(userRepo, geoLocationService);
    const getUserById = new GetUserById(userRepo);
    const createRegion = new CreateRegion(regionsRepo, getUserById);
    const user_1 = await createUser.exec(userValidA1);
    user_2 = await createUser.exec(otherUserA2);

    await createRegion.exec({
      name: 'Region 1',
      coordinates: coordinateA1,
      userId: user_1.id,
    });

    await createRegion.exec({
      name: 'Region 2',
      coordinates: coordinateA2,
      userId: user_1.id,
    });

    await createRegion.exec({
      name: 'Region 3',
      coordinates: coordinateB1,
      userId: user_2.id,
    });

    await createRegion.exec({
      name: 'Region 4',
      coordinates: coordinateB2,
      userId: user_2.id,
    });

    const geoLocationDistance = new GeoLocationDistance();
    getAllRegionsClose = new GetAllRegionsCloseToCoordinate(regionsRepo, geoLocationDistance);
  });

  it('should return a list containing regions in determined coordinate with a distance', async () => {
    const result = await getAllRegionsClose.exec(pesquisa, 20);
    expect(result.length).toBeGreaterThan(0);
    console.log(result);
  });
});
