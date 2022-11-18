import { getCustomRepository } from "typeorm";

import User from "../typeorm/entities/Users";
import UserRepository from "../typeorm/repositories/UserRepository";

class ListUsersService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    const users = userRepository.find();
    return users;
  }
}

export default ListUsersService;
