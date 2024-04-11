import { CreateUser } from './service/user/Create';
import { UserController } from './api/controllers/UserController';
import { MemoryUserRepository } from './database/test/mockRepositories/MemoryUserRepository';
import { GetAllUsers } from './service/user/GetAllUsers';
import { GetUserById } from './service/user/GetUserById';
import { DeleteUser } from './service/user/Delete';
import { UpdaterUser } from './service/user/Update';
import { MemoryRegionRepository } from './database/test/mockRepositories/MemoryRegionRepository';
import { CreateRegion } from './service/regions/Create';
import { GetAllRegions } from './service/regions/GetAllRegions';
import { GetRegionById } from './service/regions/GetRegionById';
import { DeleteRegion } from './service/regions/Delete';
import { UpdaterRegion } from './service/regions/Update';
import { RegionControler } from './api/controllers/RegionControler';

//REPOSITORIOS
export const usersRepository = new MemoryUserRepository();
export const regionsRepository = new MemoryRegionRepository();

//SERVIÇOS
export const createUser = new CreateUser(usersRepository);
export const getAllUsers = new GetAllUsers(usersRepository);
export const getUserById = new GetUserById(usersRepository);
export const deleteUser = new DeleteUser(usersRepository);
export const updaterUser = new UpdaterUser(usersRepository);

export const createRegion = new CreateRegion(regionsRepository);
export const getAllRegions = new GetAllRegions(regionsRepository);
export const getRegionBy = new GetRegionById(regionsRepository);
export const deleteRegion = new DeleteRegion(regionsRepository);
export const updatedRegion = new UpdaterRegion(regionsRepository);

//CONTROLLER
export const userController = new UserController(createUser, getAllUsers, getUserById, deleteUser, updaterUser);
export const regionsController = new RegionControler(
  createRegion,
  getAllRegions,
  getRegionBy,
  deleteRegion,
  updatedRegion,
);
