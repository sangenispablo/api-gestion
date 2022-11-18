import path from "path";
import fs from "fs";

import { getCustomRepository } from "typeorm";

import AppError from "../../../shared/errors/AppError";
import uploadConfig from "../../../config/upload";

import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/Users";
import { fstat } from "fs";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found.");
    }
    // si tiene una archivo asociado lo borro
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExits = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExits) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    // asigno el archivo al campo, guardo y lo retorno
    user.avatar = avatarFilename;
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
