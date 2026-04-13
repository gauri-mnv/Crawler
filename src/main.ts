/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS enable karna zaroori hai taaki frontend backend se baat kar sake
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  // Render port
  const port = process.env.PORT ?? 4005;

  // '0.0.0.0' means listen on all available network interfaces
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Crawler Backend is running on: http://0.0.0.0:${port}`);
}
bootstrap();
