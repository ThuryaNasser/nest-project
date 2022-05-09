import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeasModule } from './teas/teas.module';

@Module({
  imports: [
    TeasModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username
      password: 'postgres', // user password
      database: 'ilovetea', // name of our database,
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
