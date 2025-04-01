import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>(
      'allowedRoles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest<Request>();
    const result = request?.currentUser?.roles
      .map((role: string) => allowedRoles.includes(role))
      .find((val: boolean) => val === true);
    if (result) return true;
    throw new UnauthorizedException(
      'You are not authorized to access this resource',
    );
  }
}
