// users/User.ts
import { uuidv7 } from 'uuidv7';
import { Address, Coordinates } from './Address';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

export interface UserAttributes {
  id?: string;
  name: string;
  email: string;
  address?: Address | null;
  coordinates?: Coordinates | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface UserAttributesUpdate {
  id?: string;
  name?: string;
  email?: string;
  address?: Address | null;
  coordinates?: Coordinates | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class User {
  readonly id: string;
  name: string;
  email: string;
  address?: Address | null;
  coordinates?: Coordinates | null;
  createdAt: Date;
  updatedAt?: Date | null;
  constructor(attributes: UserAttributes) {
    if (!User.hasAddressOrCoordinates(attributes)) {
      throw new UnprocessableEntity('User');
    }
    this.id = uuidv7();
    this.name = attributes.name;
    this.email = attributes.email;
    this.address = attributes.address ? new Address(attributes.address) : null;
    this.coordinates = attributes.coordinates ? new Coordinates(attributes.coordinates) : null;
    this.updatedAt = attributes.updatedAt ?? null;
    this.createdAt = attributes.createdAt ?? new Date();
  }

  static hasAddressOrCoordinates(attributes: UserAttributes): boolean {
    if (attributes.address && attributes.coordinates) return false;
    if (!attributes.address && !attributes.coordinates) return false;
    return true;
  }
}
