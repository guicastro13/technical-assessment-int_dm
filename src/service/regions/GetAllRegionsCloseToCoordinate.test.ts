import { MemoryRegionRepository } from '../../database/test/mockRepositories/MemoryRegionRepository';
import { MemoryUserRepository } from '../../database/test/mockRepositories/MemoryUserRepository';
import { Coordinates } from '../../entities/Address';
import { UserAttributes } from '../../entities/User';
import { GeoLocationDistance } from '../GeoLocationDistance';
import { CreateUser } from '../user/Create';
import { GetAllRegionsCloseToCoordinate } from './GetAllRegionsCloseToCoordinate';
import { CreateRegion } from './Create';

describe('Get All Regions Close to Coordinate', () => {
  let getAllRegionsClose: GetAllRegionsCloseToCoordinate;

  // diferença de 950 m
  // -22.40083454639946, -47.56297832084271
  // -22.392504686710215, -47.565024241120355

  // 21.64 Km
  // -22.545298697864474, -47.42180754266027
  // -22.400830790167916, -47.562983198639216

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

  beforeAll(async () => {
    const userRepo = new MemoryUserRepository();
    const regionsRepo = new MemoryRegionRepository();
    const createUser = new CreateUser(userRepo);
    const createRegion = new CreateRegion(regionsRepo);
    const user = await createUser.exec(userValid);
    await createRegion.exec({ name: 'Region 1', coordinates: { ...coordinate2 }, userId: user.id });
    const geoLocationDistance = new GeoLocationDistance();
    getAllRegionsClose = new GetAllRegionsCloseToCoordinate(regionsRepo, geoLocationDistance);
  });
  it('should return a list containing regions in determined coordinate with a distance', async () => {
    const result = await getAllRegionsClose.exec(coordinate1);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(({ region, distance }) => {
      expect(region).toBeDefined();
      expect(distance).toBeDefined();
      expect(distance).toBeGreaterThanOrEqual(0);
    });
  });
});
