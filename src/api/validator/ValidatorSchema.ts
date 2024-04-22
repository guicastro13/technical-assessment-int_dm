import { ZodError, z } from 'zod';
import { InvalidParamsError } from '../../errors/InvalidParam';

export class ValidatorSchema {
  static addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string(),
  });

  static coordinatesSchema = z.object({
    longitude: z.number(),
    latitude: z.number(),
  });

  static userSchema = z
    .object({
      name: z.string().min(1),
      email: z.string().email(),
      address: ValidatorSchema.addressSchema.nullish(),
      coordinates: ValidatorSchema.coordinatesSchema.nullish(),
    })
    .refine((user) => {
      if (!user.address && !user.coordinates) {
        throw new InvalidParamsError('Você deve fornecer coordenadas OU endereço.');
      }
      if (user.address && user.coordinates) {
        throw new InvalidParamsError('Você deve fornecer coordenadas OU endereço, não os ambos.');
      }
      return true;
    });

  static userUpdateSchema = z
    .object({
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
      address: ValidatorSchema.addressSchema.optional(),
      coordinates: ValidatorSchema.coordinatesSchema.optional(),
    })
    .refine((user) => {
      if (user.address && user.coordinates) {
        throw new InvalidParamsError('Você deve fornecer coordenadas OU endereço, não os ambos.');

        // 'Endereço ou Coordenadas são obrigatórios'
      }
      return true;
    });

  static UUID = z.string().uuid();

  static regionSchema = z.object({
    name: z.string().min(1),
    coordinates: ValidatorSchema.coordinatesSchema,
    userId: ValidatorSchema.UUID,
  });

  static regionUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    coordinates: ValidatorSchema.coordinatesSchema.optional(),
  });
}
