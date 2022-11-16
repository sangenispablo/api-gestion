import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import AppError from "../../../shared/errors/AppError";

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
  public async execute({ email, password }: IRequest): Promise<IResponse> {
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
    const token = sign({}, "719b6bf76b02b5a028767427542edb07", {
      subject: user.id,
      expiresIn: "1d",
    });
    return { user, token };
  }
}

export default CreateSessionService;
