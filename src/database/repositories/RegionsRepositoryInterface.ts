import { Region } from '../../entities/Region';

export interface RegionsRepositoryI {
  save(region: Region): Promise<Region>;
  getAll(): Promise<Array<Region> | null>;
  getRegionById(regionId: string): Promise<Region | null>;
  getRegionByName(name: string): Promise<Region | null>;
  update(id: string, region: Region): Promise<Region | null>;
  delete(name: string): Promise<void>;
}
