import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*

  Nest building blocks : 
  -Exception filters -> handling unhandled error thats may happens ( control specific response )  
  -Pipes -> to handel transformation and validation 
  -Guards -> to determine if a given request need a certain condition like authentications 
  -Interceptors:
     -> to bind extra logic before or after methods execution 
     -> to transform the result returned from a method 
     -> to extend basic methods behaviors 
     -> override a method


  Nest building blocks can be:
    Globally-scoped -> at app.module 
    Controller-scoped, 
    Method-scoped, 
    Param-scoped (Pipes only).
    
    */

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
