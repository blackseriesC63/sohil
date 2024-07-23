import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class IsOwnAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const adminId: number = +request.params.id;
    const admin: Admin = request.user;

    if (admin.id === adminId) {
      return true;
    }

    return false;
  }
}
