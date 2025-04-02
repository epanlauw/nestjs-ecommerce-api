import {
  CanActivate,
  ExecutionContext,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

// @Injectable()
// export class AuthorizeGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const allowedRoles = this.reflector.get<string[]>(
//       'allowedRoles',
//       context.getHandler(),
//     );
//     const request = context.switchToHttp().getRequest<Request>();
//     const result = request?.currentUser?.roles
//       .map((role: string) => allowedRoles.includes(role))
//       .find((val: boolean) => val === true);
//     if (result) return true;
//     throw new UnauthorizedException(
//       'You are not authorized to access this resource',
//     );
//   }
// }
export const AuthorizeGuard = (allowedRoles: string[]) => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
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
  const guard = mixin(RolesGuardMixin);
  return guard;
};
