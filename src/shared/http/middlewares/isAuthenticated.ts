import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../../errors/AppError";
import authConfig from "../../../config/auth";

interface ITokenPayload {
  iat: number,
  exp: number,
  sub: string
}

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("JWT Token is missing.");
  }
  // como el authHeader viene con un Bearer en el string lo sacamos y separamos el token
  const [, token] = authHeader.split(" ");
  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const {sub} = decodedToken as ITokenPayload;
    req.user = {
      id: sub
    };
    return next();
  } catch (error) {
    throw new AppError("Invalid JWT Token.");
  }
}

export default isAuthenticated;
