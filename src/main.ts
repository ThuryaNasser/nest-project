import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Enabling "whitelist" feature of ValidationPipe
      forbidNonWhitelisted: true, //Throw errors when whitelisted properties are found
      transform: true, // Enabling auto transform feature of ValidationPipe
    }),
  );
  await app.listen(3004);
}
bootstrap();
