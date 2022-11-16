import { compareSync } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';

import UserRepository from '../typeorm/repositories/UserRepository';
import User from '../typeorm/entities/Users';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combinatio.', 401);
    }

    const passwordConfirmed = compareSync(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combinatio.', 401);
    }

    return user;
  }
}

export default CreateSessionService;
