import { Coordinates } from './Address';
import { Uuid } from '../helpers/uuid';

export interface RegionAttributes {
  id?: string;
  name: string;
  coordinates: Coordinates;
  userId: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface RegionAttributesUpdate {
  id?: string;
  name?: string;
  coordinates?: Coordinates;
  userId?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class Region {
  readonly id: string;
  name: string;
  coordinates: Coordinates;
  userId: string;
  createdAt: Date;
  updatedAt?: Date | null;

  constructor(attributes: RegionAttributes) {
    this.id = attributes.id ?? Uuid.generate();
    this.name = attributes.name;
    this.coordinates = new Coordinates(attributes.coordinates);
    this.userId = attributes.userId;
    this.createdAt = attributes.createdAt ?? new Date();
    this.updatedAt = attributes.updatedAt ?? null;
  }
}
