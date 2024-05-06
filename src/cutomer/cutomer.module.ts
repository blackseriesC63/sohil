import { Module } from '@nestjs/common';
import { CutomerController } from './cutomer.controller';
import { CustomerService } from './cutomer.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,MailModule
  ],
  controllers: [CutomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CutomerModule {}
