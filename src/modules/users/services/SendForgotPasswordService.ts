import { getCustomRepository } from "typeorm";

import AppError from "../../../shared/errors/AppError";

import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

import EtherealMail from "../../../config/mail/EtherealMail";

interface IRequest {
  email: string;
}

class SendForgortPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User does not extists.");
    }

    const userToken = await userTokensRepository.generate(user.id);
    // console.log(token);
    await EtherealMail.sendMail({
      to: email,
      body: `Se solicito cambio de contraseña: ${userToken?.token}`
    });
  }
}

export default SendForgortPasswordService;
