import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  expiresIn: number;
  subject: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    console.log(
      'Retorno do médodo verify(token, authConfig.jwt.secrect): ',
      decoded,
    );

    const { subject } = decoded as ITokenPayload;

    request.user = {
      id: subject,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
