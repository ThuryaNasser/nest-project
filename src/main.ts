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
      transformOptions: {
        enableImplicitConversion: true, // if we use this, then no need to add type in the dto file
      },
    }),
  );
  await app.listen(3004);
}
bootstrap();
