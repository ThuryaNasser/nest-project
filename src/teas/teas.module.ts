import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tea } from './entities/tea.entity';
import { Flavor } from './entities/tea.flavor.entity';
import { TeasController } from './teas.controller';
import { TeasService } from './teas.service';
/**
 Module contain 4 main things :
 1- controllers === api rout that this module instantiate 
 2- exports === list of providers that is accessible when ever this module is imported
 3- imports === other module that is module import 
 4- providers === provider are available only with this module it self, unless added to the exports array 
 */

/*
 controllers === controllers,
 providers === services ,
*/

@Module({
  imports: [TypeOrmModule.forFeature([Tea, Flavor])], // 👈 Adding Tea Entity here to TypeOrmModule.forFeature
  controllers: [TeasController],
  providers: [TeasService],
})
export class TeasModule {}
