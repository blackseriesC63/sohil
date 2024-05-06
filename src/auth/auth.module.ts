import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminModule } from '../admin/admin.module';
import { AccessTokenStrategy } from '../common/strategies';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [JwtModule.register({}), PrismaModule, AdminModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenStrategy,
    },
    Logger
  ],
})
export class AuthModule {}
