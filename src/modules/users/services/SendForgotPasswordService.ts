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

    const { token } = await userTokensRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: { name: user.name, email: user.email },
      from: { name: "Soporte API Gestion", email: "soporte@pas.ar" },
      subject: "[API Gestion] Recuperación de Contraseña",
      templateData: {
        template: `Hola {{name}} tu token: {{token}}`,
        vars: {
          name: user.name,
          token,
        }
      }
    });
  }
}

export default SendForgortPasswordService;
