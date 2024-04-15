import { GeoLocationDistance } from './GeoLocationDistance';
import { Coordinates } from '../entities/Address';

describe('GET LOCATION DISTANCE', () => {
  let geodistance: GeoLocationDistance;

  // diferença de 950 m
  // -22.40083454639946, -47.56297832084271
  // -22.392504686710215, -47.565024241120355

  // 21.64 Km
  // -22.545298697864474, -47.42180754266027
  // -22.400830790167916, -47.562983198639216

  const coordinate1: Coordinates = {
    latitude: -22.545298697864474,
    longitude: -47.42180754266027,
  };

  const coordinate2: Coordinates = {
    latitude: -22.400830790167916,
    longitude: -47.562983198639216,
  };

  beforeAll(() => {
    geodistance = new GeoLocationDistance();
  });
  it('Should return a distace once given 2 coordenates', async () => {
    const result = geodistance.getDistance(coordinate1, coordinate2);
  });
});
