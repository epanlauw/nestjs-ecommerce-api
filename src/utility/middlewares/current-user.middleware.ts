import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity | null;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (
      !authHeader ||
      isArray(authHeader) ||
      !authHeader.startsWith('Bearer ')
    ) {
      req.currentUser = null;
      next();
      return;
    } else {
      try {
        const token = authHeader.split(' ')[1];
        const { id } = <JwtPayload>(
          verify(token, process.env.JWT_SECRET as string)
        );
        const currentUser = await this.userService.findOne(+id);
        req.currentUser = currentUser;
        next();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        req.currentUser = null;
        next();
      }
    }
  }
}

interface JwtPayload {
  id: string;
}
