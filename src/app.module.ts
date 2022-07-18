import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeasModule } from './teas/teas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TeasModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: process.env.DATABASE_HOST, // database host
      port: parseInt(process.env.DATABASE_PORT), // database host
      username: process.env.DATABASE_USER, // username
      password: process.env.DATABASE_PASSWORD, // user password
      database: process.env.DATABASE_NAME, // name of our database,
      dropSchema: false,
      migrationsRun: false,
      synchronize: false, // your entities will be synced with the database(recommended: disable in production)
      entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
      autoLoadEntities: true, // models will be loaded automatically
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
/*
 imports === modules,
 controllers === controllers,
 providers === services ,
*/
