import { Coordinates } from '../../entities/Address';
import { Region } from '../../entities/Region';

export interface RegionsRepositoryI {
  save(region: Region): Promise<Region>;
  getAll(): Promise<Array<Region> | null>;
  getRegionById(regionId: string): Promise<Region | null>;
  updateById(regionId: string, region: Region): Promise<Region | null>;
  deleteById(regionId: string): Promise<void>;
  getRegionsNearby(coordinates: Coordinates, howMuchCloseInKM: number, userId?: string): Promise<Array<Region> | null>;
}
