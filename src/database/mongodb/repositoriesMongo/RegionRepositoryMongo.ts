import { Region } from '../../../entities/Region';
import { RegionsRepositoryI } from '../../repositoriesInterfaces/RegionsRepositoryInterface';
import { RegionModel } from '../schemas/schemas';

export class RegionRepositoryMongo implements RegionsRepositoryI {
  async save(region: Region): Promise<Region> {
    const regionDocument = new RegionModel(region);
    const savedRegion = await regionDocument.save();
    return new Region(savedRegion.toObject());
  }

  async getAll(): Promise<Region[] | null> {
    const regions = await RegionModel.find();
    return regions.map((regionDoc) => new Region(regionDoc.toObject())) || null;
  }

  async getRegionById(regionId: string): Promise<Region | null> {
    const regionDocument = await RegionModel.findOne({ id: regionId });
    return regionDocument ? new Region(regionDocument.toObject()) : null;
  }

  async getRegionByName(name: string): Promise<Region | null> {
    const regionDocument = await RegionModel.findOne({ name });
    return regionDocument ? new Region(regionDocument.toObject()) : null;
  }

  async updateById(regionId: string, updatedRegion: Region): Promise<Region | null> {
    const updatedRegionDocument = await RegionModel.findOneAndUpdate({ id: regionId }, updatedRegion, { new: true });
    return updatedRegionDocument ? new Region(updatedRegionDocument.toObject()) : null;
  }

  async deleteById(regionId: string): Promise<void> {
    await RegionModel.deleteOne({ id: regionId });
  }
}
