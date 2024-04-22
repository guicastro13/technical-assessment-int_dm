// users/User.ts
import { Address, Coordinates } from './Address';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { Uuid } from '../helpers/uuid';

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
    this.id = attributes.id ? attributes.id : Uuid.generate();
    this.name = attributes.name;
    this.email = attributes.email;
    this.address = attributes.address ? new Address(attributes.address) : null;
    this.coordinates = attributes.coordinates ? new Coordinates(attributes.coordinates) : null;
    this.updatedAt = attributes.updatedAt ?? null;
    this.createdAt = attributes.createdAt ?? new Date();
  }
}
