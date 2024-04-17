import dotenv from "dotenv"
import path from "node:path"
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
import { RegionController } from './api/controllers/RegionController';
import { UserRepositoryMongo } from './database/mongodb/repositoriesMongo/UserRepositoryMongo';
import { RegionRepositoryMongo } from './database/mongodb/repositoriesMongo/RegionRepositoryMongo';
import { LoggerService } from './helpers/Logger';
import { MongoDB } from './database/mongodb/mongodb';
import { Server } from "./server";

dotenv.config({ path: path.resolve(__dirname, "..", ".env.dev")});

export const logger = new LoggerService()

export const mongo = new MongoDB(logger)
//REPOSITORIES MEMORY
export const usersRepositoryMemory = new MemoryUserRepository();
export const regionsRepositoryMemory = new MemoryRegionRepository();
//REPOSITORIES MONGO
export const usersRepositoryMongo = new UserRepositoryMongo();
export const regionRepositoryMongo = new RegionRepositoryMongo();

//SERVICES
export const createUser = new CreateUser(usersRepositoryMongo);
export const getAllUsers = new GetAllUsers(usersRepositoryMongo);
export const getUserById = new GetUserById(usersRepositoryMongo);
export const deleteUser = new DeleteUser(usersRepositoryMongo);
export const updaterUser = new UpdaterUser(usersRepositoryMongo);

export const createRegion = new CreateRegion(regionRepositoryMongo);
export const getAllRegions = new GetAllRegions(regionRepositoryMongo);
export const getRegionBy = new GetRegionById(regionRepositoryMongo);
export const deleteRegion = new DeleteRegion(regionRepositoryMongo);
export const updatedRegion = new UpdaterRegion(regionRepositoryMongo);

//CONTROLLER
export const userController = new UserController(createUser, getAllUsers, getUserById, deleteUser, updaterUser);
export const regionsController = new RegionController(
  createRegion,
  getAllRegions,
  getRegionBy,
  deleteRegion,
  updatedRegion,
);

export const server = new Server(logger)
