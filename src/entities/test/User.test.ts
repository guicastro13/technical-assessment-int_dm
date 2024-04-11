import { UnprocessableEntity } from '../../errors/UnprocessableEntity';
import { User, UserAttributes } from '../User';

describe('User', () => {
  it('constructor throws error if no address or coordinates provided', () => {
    const invalidAttributes: UserAttributes = {
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
    };
    expect(() => {
      new User(invalidAttributes);
    }).toThrow(UnprocessableEntity);
    invalidAttributes.address = {
      street: '123 Main St',
      city: 'City',
      state: 'State',
      country: 'Country',
      zipCode: '12345',
    };
    invalidAttributes.coordinates = {
      latitude: 123,
      longitude: 456,
    };
    expect(() => {
      new User(invalidAttributes);
    }).toThrow(UnprocessableEntity);
  });

  it('constructor does not throw error if either address or coordinates provided', () => {
    const validAddress: UserAttributes = {
      name: 'John Doe',
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'City',
        state: 'State',
        country: 'Country',
        zipCode: '12345',
      },
      createdAt: new Date(),
    };

    const validCoordinates: UserAttributes = {
      name: 'John Doe',
      email: 'john@example.com',
      coordinates: {
        latitude: 123,
        longitude: 456,
      },
      createdAt: new Date(),
    };

    expect(() => {
      new User(validAddress);
    }).not.toThrow();

    expect(() => {
      new User(validCoordinates);
    }).not.toThrow();
  });
});
