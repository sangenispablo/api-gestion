import {compareSync} from "bcryptjs";
import {sign} from "jsonwebtoken";
import {getCustomRepository} from "typeorm";

import AppError from "../../../shared/errors/AppError";
import authConfig from "../../../config/auth";

import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/Users";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionService {
    public async execute({email, password}: IRequest): Promise<IResponse> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Incorrect email or password combination.", 401);
        }

        const passwordConfirmed = compareSync(password, user.password);
        if (!passwordConfirmed) {
            throw new AppError("Incorrect email or password combination.", 401);
        }

        // aca configuro el JWT
        // TODO: pasar a una variable de entorno el valor de abajo
        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });
        return {user, token};
    }
}

export default CreateSessionService;
