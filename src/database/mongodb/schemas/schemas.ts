import mongoose from 'mongoose';
import { Uuid } from '../../../helpers/uuid';

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: false,
  },
  coordinates: {
    type: [Number],
    required: false,
  },
});

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: Uuid.generate(),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: addressSchema,
    required: false,
  },
  coordinates: pointSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const regionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: Uuid.generate(),
  },
  name: {
    type: String,
    required: true,
  },
  coordinates: pointSchema,
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

userSchema.index({ coordinates: '2dsphere' });
regionSchema.index({ coordinates: '2dsphere' });

const UserModel = mongoose.model('User', userSchema);
const RegionModel = mongoose.model('Region', regionSchema);

export { UserModel, RegionModel };
