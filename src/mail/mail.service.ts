import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(user: Customer) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/cutomer/activate/${user.activation_link}`;
    console.log(user);
    console.log(url);
    
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to our Sohil truck team! Confirm your email address',
      template: 'confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
