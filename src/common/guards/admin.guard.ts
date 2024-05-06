import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(`Unuathorized  admin`);
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(`Invalid authorization`);
    }

    async function verify(token: string, jwtService: JwtService) {
      let admin: any;
      try {
        const admin = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
        const dataDecoded = await jwtService.decode(token, {
          // secret: process.env.ACCESS_TOKEN_KEY,
        });
        console.log('decoded: ', dataDecoded);

        // if (admin.hasOwnProperty('is_active')) {
        //   throw new UnauthorizedException(`hasOwnProperty ishladi ruxsat yoq`);
        // }
        // console.log(admin.hasOwnProperty('is_active'));

        if (!admin) {
          throw new UnauthorizedException(`Unuathorized  admin`);
        }
        console.log('admin  ', admin);
        req.admin = admin;

        // console.log('req.admin', req.admin);

        return true;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
    return verify(token, this.jwtService);
  }
}
