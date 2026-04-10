/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('ejs');

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4005);
  console.log(`Application is running on: localhost:${4005}`);
}
bootstrap();
