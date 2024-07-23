



import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Admin } from '@prisma/client';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const admin: Admin = request.user; // Assuming you have middleware to attach admin object to request

    // Check if the user is authenticated as an admin
    if (admin) {
      return true;
    }

    // Return false if not authenticated as an admin
    return false;
  }
}
