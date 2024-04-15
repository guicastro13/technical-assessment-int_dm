import { Region } from '../../../entities/Region';
import { RegionsRepositoryI } from '../../repositoriesInterfaces/RegionsRepositoryInterface';

export class MemoryRegionRepository implements RegionsRepositoryI {
  private regions: Map<string, Region>;

  constructor() {
    this.regions = new Map<string, Region>();
  }

  async save(region: Region): Promise<Region> {
    this.regions.set(region.id, region);
    return region;
  }

  async getAll(): Promise<Array<Region> | null> {
    return Array.from(this.regions.values());
  }

  async getRegionById(regionId: string): Promise<Region | null> {
    return this.regions.get(regionId) || null;
  }

  async getRegionByName(name: string): Promise<Region | null> {
    for (const [, user] of this.regions) {
      if (user.name === name) {
        return user;
      }
    }
    return null;
  }

  async updateById(id: string, updatedRegion: Region): Promise<Region | null> {
    if (this.regions.has(id)) {
      this.regions.set(id, updatedRegion);
      return updatedRegion;
    }
    return null;
  }

  async deleteById(regionId: string): Promise<void> {
    this.regions.delete(regionId);
  }
}
