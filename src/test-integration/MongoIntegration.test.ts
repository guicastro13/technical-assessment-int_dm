import { MongoDB } from '../database/mongodb/mongodb';
import { RegionRepositoryMongo } from '../database/mongodb/repositoriesMongo/RegionRepositoryMongo';
import { RegionsRepositoryI } from '../database/repositoriesInterfaces/RegionsRepositoryInterface';
import { Coordinates } from '../entities/Address';
import { Region } from '../entities/Region';
import { LoggerService } from '../helpers/Logger';

describe('Mongo Integration', () => {
  let regionRepository: RegionsRepositoryI;
  let region: Region;

  // diferença de 950 m
  // -22.40083454639946, -47.56297832084271
  // -22.392504686710215, -47.565024241120355

  // 21.64 Km
  // -22.545298697864474, -47.42180754266027
  // -22.400830790167916, -47.562983198639216

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
    longitude: -47.5629831986392165,
  };

  beforeEach(async () => {
    const logger = new LoggerService();
    const mongo = new MongoDB(logger);
    await mongo.connect();
    regionRepository = new RegionRepositoryMongo();
    region = new Region({
      name: 'Test Region',
      coordinates: {
        latitude: -22.40083454639946,
        longitude: -47.56297832084271,
      },
      userId: 'user123',
    });
  });

  test('save', async () => {
    const createdRegion = await regionRepository.save(region);
    expect(createdRegion.id).toEqual(region.id);
    expect(createdRegion.name).toEqual(region.name);
    expect(createdRegion.coordinates.latitude).toEqual(region.coordinates.latitude);
    expect(createdRegion.coordinates.longitude).toEqual(region.coordinates.longitude);
    expect(createdRegion.userId).toEqual(region.userId);
  });

  test('update', async () => {
    await regionRepository.save(region);
    const updatedRegionData = {
      ...region,
      name: 'Updated Test Region',
    };
    await regionRepository.updateById(region.id, updatedRegionData);
    const retrievedRegion = await regionRepository.getRegionById(region.id);
    expect(retrievedRegion?.id).toEqual(region.id);
    expect(retrievedRegion?.name).toEqual(updatedRegionData.name);
    expect(retrievedRegion?.coordinates.latitude).toEqual(region.coordinates.latitude);
    expect(retrievedRegion?.coordinates.longitude).toEqual(region.coordinates.longitude);
    expect(retrievedRegion?.userId).toEqual(region.userId);
  });

  test('delete', async () => {
    await regionRepository.save(region);
    await regionRepository.deleteById(region.id);
    const retrievedRegion = await regionRepository.getRegionById(region.id);
    expect(retrievedRegion).toBeNull();
  });

  test('getRegionsNearby', async () => {
    const result = await regionRepository.getRegionsNearby(coordinateA1, 10);
  });
});
