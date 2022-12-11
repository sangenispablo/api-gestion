import {getCustomRepository} from "typeorm";

import AppError from "../../../shared/errors/AppError";

import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

import EtherealMail from "../../../config/mail/EtherealMail";

interface IRequest {
    email: string;
}

class SendForgortPasswordService {
    public async execute({email}: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("User does not extists.");
        }

        const {token} = await userTokensRepository.generate(user.id);
        // console.log(token);
        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API-Gestion - Recuperacion de Contraseña]',
            from: {
                name: 'Support',
                email: 'support@apigestion.com',
            },
            templateData: {
                template: `Hola {{name}}, tu token de recuperacion es {{token}}`,
                vars: {
                    name: user.name,
                    token,
                }
            }
        })
    }
}

export default SendForgortPasswordService;
