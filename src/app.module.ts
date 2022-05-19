import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeasModule } from './teas/teas.module';

@Module({
  imports: [
    TeasModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 35432, // database host
      username: 'postgres', // username
      password: 'postgres', // user password
      database: 'postgres', // name of our database,
      // entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in production)
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
