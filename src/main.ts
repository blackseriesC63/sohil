import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerFactory } from './common/logger/logger-factory';

async function start() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('Sohil'),
  });
  const PORT = process.env.PORT || 3001;

  const config = new DocumentBuilder()
    .setTitle('Sohil TRUCK')
    .setDescription('About Sohil truck cafe')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT || 3001, () => {
    console.log(`http://localhost:${PORT}`);
  });
}
start();
