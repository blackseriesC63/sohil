import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAILER_HOST'),
          secure: false,
          auth: {
            user: config.get<string>('MAILDEV_USER'),
            pass: config.get<string>('MAILDEV_PASS'),
          },
        },
        defaults: {
          from: `"Sohil"<${config.get('MAILER_HOST')}>`,
        },
        template: {
          // dir: join(process.cwd(), 'src', 'mail', 'templates'),
          dir: join(__dirname, 'templates'),
          // dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          template: 'confirmation',
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
