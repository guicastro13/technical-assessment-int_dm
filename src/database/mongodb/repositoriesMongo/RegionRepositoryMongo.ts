import { FilterQuery } from 'mongoose';
import { Region } from '../../../entities/Region';
import { RegionsRepositoryI } from '../../repositoriesInterfaces/RegionsRepositoryInterface';
import { RegionModel } from '../schemas/schemas';
import { Coordinates } from '../../../entities/Address';

export class RegionRepositoryMongo implements RegionsRepositoryI {
  async save(region: Region): Promise<Region> {
    const regionDocument = new RegionModel({
      id: region.id,
      name: region.name,
      coordinates: {
        type: 'Point',
        coordinates: [region.coordinates.latitude, region.coordinates.longitude],
      },
      userId: region.userId,
    });
    const savedRegion = await regionDocument.save();
    return new Region({
      id: savedRegion.id,
      name: savedRegion.name,
      userId: savedRegion.userId,
      coordinates: {
        latitude: savedRegion.coordinates!.coordinates![0] as number,
        longitude: savedRegion.coordinates!.coordinates![1] as number,
      },
    });
  }

  async getAll(): Promise<Region[] | null> {
    const regions = await RegionModel.find();
    return (
      regions.map(
        (regionDoc) =>
          new Region({
            id: regionDoc.id,
            name: regionDoc.name,
            userId: regionDoc.userId,
            coordinates: {
              latitude: regionDoc.coordinates!.coordinates![0] as number,
              longitude: regionDoc.coordinates!.coordinates![1] as number,
            },
          }),
      ) || null
    );
  }

  async getRegionById(regionId: string): Promise<Region | null> {
    const regionDocument = await RegionModel.findOne({ id: regionId });
    return regionDocument
      ? new Region({
          id: regionDocument.id,
          name: regionDocument.name,
          userId: regionDocument.userId,
          coordinates: {
            latitude: regionDocument.coordinates!.coordinates![0] as number,
            longitude: regionDocument.coordinates!.coordinates![1] as number,
          },
        })
      : null;
  }

  async getRegionByName(name: string): Promise<Region | null> {
    const regionDocument = await RegionModel.findOne({ name });
    return regionDocument
      ? new Region({
          id: regionDocument.id,
          name: regionDocument.name,
          userId: regionDocument.userId,
          coordinates: {
            latitude: regionDocument.coordinates!.coordinates![0] as number,
            longitude: regionDocument.coordinates!.coordinates![1] as number,
          },
        })
      : null;
  }

  async updateById(regionId: string, updatedRegion: Region): Promise<Region | null> {
    const regionDocument = new RegionModel({
      name: updatedRegion.name,
      coordinates: {
        type: 'Point',
        coordinates: [updatedRegion.coordinates.latitude, updatedRegion.coordinates.longitude],
      },
    });
    const updatedRegionDocument = await RegionModel.findOneAndUpdate(
      { id: regionId },
      {
        $set: {
          name: regionDocument.name,
          coordinates: regionDocument.coordinates,
          updatedAt: new Date(),
        },
      },
      { new: true },
    );
    return new Region({
      id: updatedRegionDocument!.id,
      name: updatedRegionDocument!.name,
      userId: updatedRegionDocument!.userId,
      coordinates: {
        latitude: updatedRegionDocument!.coordinates!.coordinates![0] as number,
        longitude: updatedRegionDocument!.coordinates!.coordinates![1] as number,
      },
      createdAt: updatedRegionDocument!.createdAt,
      updatedAt: updatedRegionDocument!.updatedAt,
    });
  }

  async deleteById(regionId: string): Promise<void> {
    await RegionModel.deleteOne({ id: regionId });
  }

  async getRegionsNearby(coordinates: Coordinates, howMuchCloseInKM: number, userId: string) {
    const { latitude, longitude } = coordinates;
    let filterQuery: FilterQuery<any> = {
      coordinates: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
          $maxDistance: +howMuchCloseInKM * 1000,
        },
      },
    };
    if (userId) {
      filterQuery.user = {
        $ne: userId,
      };
    }

    const regions = await RegionModel.find(filterQuery);
    return (
      regions.map(
        (regionDoc) =>
          new Region({
            id: regionDoc.id,
            name: regionDoc.name,
            userId: regionDoc.userId,
            coordinates: {
              latitude: regionDoc.coordinates!.coordinates![0] as number,
              longitude: regionDoc.coordinates!.coordinates![1] as number,
            },
          }),
      ) || null
    );
  }
}
