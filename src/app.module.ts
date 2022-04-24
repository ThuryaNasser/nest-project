import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeasController } from './teas/teas.controller';
import { TeasService } from './teas/teas.service';

@Module({
  imports: [],
  controllers: [AppController, TeasController],
  providers: [AppService, TeasService],
})
export class AppModule {}
