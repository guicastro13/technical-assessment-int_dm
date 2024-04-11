import { NoContent } from '../../errors/NoContent';
import { CreateUser } from '../../service/user/Create';
import { DeleteUser } from '../../service/user/Delete';
import { GetAllUsers } from '../../service/user/GetAllUsers';
import { GetUserById } from '../../service/user/GetUserById';
import { UpdaterUser } from '../../service/user/Update';
import { HttpHandler } from '../HttpServer';
import { ValidatorSchema } from '../validator/ValidatorSchema';

export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getAllusers: GetAllUsers,
    private readonly getUserById: GetUserById,
    private readonly deleteUser: DeleteUser,
    private readonly updaterUser: UpdaterUser,
  ) {}

  register: HttpHandler = async (request) => {
    const { name, email, address, coordinates } = ValidatorSchema.userSchema.parse(request.body);
    const user = await this.createUser.exec({
      name,
      email,
      address,
      coordinates,
    });
    return { statusCode: 201, body: { user, message: 'Usuário Criado' } };
  };

  getAll: HttpHandler = async () => {
    const users = await this.getAllusers.exec();
    if (users!.length == 0) {
      throw new NoContent();
    }
    return { statusCode: 200, body: { users, message: 'Requisção concluida com sucesso' } };
  };

  getById: HttpHandler = async (request) => {
    const userId = ValidatorSchema.UUID.parse(request.params?.user_id);
    let user = await this.getUserById.exec(userId);
    if (user == null) {
      return { statusCode: 200, body: { message: 'Nenhum usuario com esse ID' } };
    }
    return { statusCode: 200, body: { user, message: 'Requisção concluida com sucesso' } };
  };

  update: HttpHandler = async (request) => {
    const userId = ValidatorSchema.UUID.parse(request.params?.user_id);
    let user = await this.getUserById.exec(userId);
    if (user == null) {
      return { statusCode: 200, body: { message: 'Nenhum usuario com esse ID' } };
    }
    const { name, email, address, coordinates } = ValidatorSchema.userUpdateSchema.parse(request.body);
    const updatedUser = await this.updaterUser.exec(userId, {
      name,
      email,
      address,
      coordinates,
    });
    return { statusCode: 200, body: { updatedUser, message: 'Entidade atualizada com sucesso' } };
  };

  delete: HttpHandler = async (request) => {
    const userId = ValidatorSchema.UUID.parse(request.params?.user_id);
    await this.deleteUser.exec(userId);
    return { statusCode: 204, body: { message: 'Excluído com sucesso' } };
  };
}
