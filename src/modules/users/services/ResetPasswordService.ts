import { isAfter, addHours } from "date-fns";
import { hashSync } from "bcryptjs";
import { getCustomRepository } from "typeorm";

import AppError from "../../../shared/errors/AppError";

import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({token, password}: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError("User Token does not extists.");
    }

    const user = await userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError("User does not extists.");
    }

    // chequeamos que no hayan pasado las 2 horas
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired");
    }

    const hashedPassword = hashSync(password, 10);
    user.password = hashedPassword;
    await userRepository.save(user);

  }
}

export default ResetPasswordService;
