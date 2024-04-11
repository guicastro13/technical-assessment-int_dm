import { Region } from '../../entities/Region';
import { MemoryRegionRepository } from './mockRepositories/MemoryRegionRepository';

describe('MemoryRegionRepository', () => {
  let regionRepository: MemoryRegionRepository;
  let region: Region;

  beforeEach(() => {
    regionRepository = new MemoryRegionRepository();
    region = new Region({
      name: 'Test Region',
      coordinates: {
        latitude: 123,
        longitude: 456,
      },
      userId: 'user123',
    });
  });

  test('save', async () => {
    const createdRegion = await regionRepository.save(region);
    expect(createdRegion).toEqual(region);
  });

  test('getRegionByName', async () => {
    await regionRepository.save(region);
    const retrievedRegion = await regionRepository.getRegionByName('Test Region');
    expect(retrievedRegion).toEqual(region);
  });

  test('update', async () => {
    await regionRepository.save(region);
    const updatedRegionData = {
      ...region,
      name: 'Updated Test Region',
    };
    await regionRepository.update(region.id, updatedRegionData);
    const retrievedRegion = await regionRepository.getRegionByName('Updated Test Region');
    expect(retrievedRegion).toEqual(updatedRegionData);
  });

  test('delete', async () => {
    await regionRepository.save(region);
    await regionRepository.delete(region.id);
    const retrievedRegion = await regionRepository.getRegionByName('Test Region');
    expect(retrievedRegion).toBeNull();
  });
});
