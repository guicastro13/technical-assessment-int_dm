import { NoContent } from '../../errors/NoContent';
import { CreateRegion } from '../../service/regions/Create';
import { DeleteRegion } from '../../service/regions/Delete';
import { GetAllRegions } from '../../service/regions/GetAllRegions';
import { GetRegionById } from '../../service/regions/GetRegionById';
import { UpdaterRegion } from '../../service/regions/Update';
import { HttpHandler } from '../HttpServer';
import { ValidatorSchema } from '../validator/ValidatorSchema';

export class RegionControler {
  constructor(
    private readonly createRegion: CreateRegion,
    private readonly getAllRegions: GetAllRegions,
    private readonly getRegionById: GetRegionById,
    private readonly deleteRegion: DeleteRegion,
    private readonly updateRegion: UpdaterRegion,
  ) {}

  create: HttpHandler = async (request) => {
    const { name, coordinates, userId } = ValidatorSchema.regionSchema.parse(request.body);
    const region = await this.createRegion.exec({ name, coordinates, userId });
    return { statusCode: 201, body: { region, message: 'Região Criada' } };
  };

  getAll: HttpHandler = async () => {
    const regions = await this.getAllRegions.exec();
    if (regions!.length === 0) {
      throw new NoContent();
    }
    return { statusCode: 200, body: { regions, message: 'Requisição concluída com sucesso' } };
  };

  getById: HttpHandler = async (request) => {
    const regionId = ValidatorSchema.UUID.parse(request.params?.region_id);
    const region = await this.getRegionById.exec(regionId);
    if (!region) {
      return { statusCode: 200, body: { message: 'Nenhuma região com este ID' } };
    }
    return { statusCode: 200, body: { region, message: 'Requisição concluída com sucesso' } };
  };

  update: HttpHandler = async (request) => {
    const regionId = ValidatorSchema.UUID.parse(request.params?.region_id);
    const region = await this.getRegionById.exec(regionId);
    if (!region) {
      return { statusCode: 200, body: { message: 'Nenhuma região com este ID' } };
    }
    const { name, coordinates } = ValidatorSchema.regionUpdateSchema.parse(request.body);
    const updatedRegion = await this.updateRegion.exec(regionId, { name, coordinates });
    return { statusCode: 200, body: { updatedRegion, message: 'Entidade atualizada com sucesso' } };
  };

  delete: HttpHandler = async (request) => {
    const regionId = ValidatorSchema.UUID.parse(request.params?.region_id);
    await this.deleteRegion.exec(regionId);
    return { statusCode: 204, body: { message: 'Excluído com sucesso' } };
  };
}
