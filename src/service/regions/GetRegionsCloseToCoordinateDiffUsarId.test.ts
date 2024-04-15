import { MemoryRegionRepository } from '../../database/test/mockRepositories/MemoryRegionRepository';
import { MemoryUserRepository } from '../../database/test/mockRepositories/MemoryUserRepository';
import { Coordinates } from '../../entities/Address';
import { User, UserAttributes } from '../../entities/User';
import { GeoLocationDistance } from '../GeoLocationDistance';
import { CreateUser } from '../user/Create';
import { CreateRegion } from './Create';
import { GetRegionsCloseToCoordinateDiffUserId } from './GetRegionsCloseToCoordinateDiffUsarId';
import { Region } from '../../entities/Region';

describe('Get All Regions Close to Coordinate', () => {
  let getRegionsCloseToCoordinateDiifUser: GetRegionsCloseToCoordinateDiffUserId;
  let user_2: User;

  // diferença de 950 m
  // -22.40083454639946, -47.56297832084271
  // -22.392504686710215, -47.565024241120355

  // 21.64 Km
  // -22.545298697864474, -47.42180754266027
  // -22.400830790167916, -47.562983198639216

  const farCoordinate: Coordinates = {
    latitude: -22.400830790167916,
    longitude: -48.0,
  };

  const nearCoordinate: Coordinates = {
    latitude: -22.400830790167916,
    longitude: -47.562983198639216,
  };

  const coordinate1: Coordinates = {
    latitude: -22.545298697864474,
    longitude: -47.42180754266027,
  };

  const coordinate2: Coordinates = {
    latitude: -22.400830790167916,
    longitude: -47.562983198639216,
  };

  const userValid: UserAttributes = {
    name: 'John Doe',
    email: 'john@example.com',
    coordinates: {
      latitude: 123,
      longitude: 456,
    },
    createdAt: new Date(),
  };

  const otherUser: UserAttributes = {
    name: 'Junior Goa',
    email: 'junior@example.com',
    coordinates: {
      latitude: 124,
      longitude: 456,
    },
    createdAt: new Date(),
  };

  beforeAll(async () => {
    const userRepo = new MemoryUserRepository();
    const regionsRepo = new MemoryRegionRepository();
    const createUser = new CreateUser(userRepo);
    const createRegion = new CreateRegion(regionsRepo);
    const user_1 = await createUser.exec(userValid);
    user_2 = await createUser.exec(otherUser);

    await createRegion.exec({
      name: 'Region 1',
      coordinates: { ...coordinate2 },
      userId: user_1.id,
    });

    await createRegion.exec({
      name: 'Region 2',
      coordinates: { ...coordinate1 },
      userId: user_1.id,
    });

    await createRegion.exec({
      name: 'Region 3',
      coordinates: { ...coordinate2 },
      userId: user_2.id,
    });

    await createRegion.exec({
      name: 'Region 4',
      coordinates: {
        latitude: -23.0,
        longitude: -48.0,
      },
      userId: user_2.id,
    });
    const geoLocationDistance = new GeoLocationDistance();
    getRegionsCloseToCoordinateDiifUser = new GetRegionsCloseToCoordinateDiffUserId(regionsRepo, geoLocationDistance);
  });

  it('should return an empty list when there are no regions close to the coordinate', async () => {
    const result = await getRegionsCloseToCoordinateDiifUser.exec(farCoordinate, user_2.id, 20);
    expect(result?.length).toBe(0);
  });

  it('should return a list with regions close to the coordinate from other users', async () => {
    const result: Array<{ region: Region; distance: number }> | [] = await getRegionsCloseToCoordinateDiifUser.exec(
      nearCoordinate,
      user_2.id,
    );
    expect(result?.length).toBeGreaterThan(0);
    result.forEach(({ region }) => {
      expect(region.userId).not.toEqual(user_2.id);
    });
  });
});
