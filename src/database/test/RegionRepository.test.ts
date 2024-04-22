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

  test('update', async () => {
    await regionRepository.save(region);
    const updatedRegionData = {
      ...region,
      name: 'Updated Test Region',
    };
    await regionRepository.updateById(region.id, updatedRegionData);
    const retrievedRegion = await regionRepository.getRegionById(region.id);
    expect(retrievedRegion).toEqual(updatedRegionData);
  });

  test('delete', async () => {
    await regionRepository.save(region);
    await regionRepository.deleteById(region.id);
    const retrievedRegion = await regionRepository.getRegionById(region.id);
    expect(retrievedRegion).toBeNull();
  });
});
