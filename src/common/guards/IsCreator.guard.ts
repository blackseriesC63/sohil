import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Admin } from '@prisma/client';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const admin: Admin = request.user;

    if (admin.is_creator) {
      return true;
    }
    return false;
  }
}


