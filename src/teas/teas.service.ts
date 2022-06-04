import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTeaDto } from './dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto';
import { Tea } from './entities/tea.entity';
import { Flavor } from './entities/tea.flavor.entity';

@Injectable()
//REMEMBER: each service is considered as provider
export class TeasService {
  constructor(
    @InjectRepository(Tea)
    private readonly teaRepository: Repository<Tea>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.teaRepository.find({
      /*relations: relations needs to be loaded with the main entity.
       Sub-relations can also be loaded (shorthand for join and leftJoinAndSelect) */
      relations: { flavors: true },
      take: limit, // for testing http://localhost:3004/teas?limit=1 => return only the first one
      skip: offset, //for testing http://localhost:3004/teas?offset=1=> return all except the first one
    });
  }

  async findOne(id: string) {
    const tea = await this.teaRepository.findOne({
      relations: { flavors: true },
      where: {
        id: +id,
      },
    });

    //send error when use try to reach id doesn't exist
    if (!tea) {
      throw new NotFoundException(`Tea with the id #${id} not found`);
    }

    return tea;
  }

  async create(createTeaDto: CreateTeaDto) {
    //loop through all the flavors in createTeaDto and call the preloadFlavorByName() to make sure they exist
    const flavors = await Promise.all(
      createTeaDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const tea = this.teaRepository.create({
      ...createTeaDto,
      flavors,
    });
    return this.teaRepository.save(tea);
  }

  async update(id: string, updateTeaDto: UpdateTeaDto) {
    const flavors =
      updateTeaDto.flavors &&
      (await Promise.all(
        updateTeaDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const existingTea = await this.teaRepository.preload({
      id: +id,
      ...updateTeaDto,
      flavors,
    });

    if (!existingTea) {
      throw new NotFoundException(`Tea with the id #${id} not found`);
    }
    return this.teaRepository.save(existingTea);
  }

  async remove(id: string) {
    const teaIndex = await this.teaRepository.findOne({
      where: {
        id: +id,
      },
    });
    return this.teaRepository.remove(teaIndex);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }

  async recommendedTea(tea: Tea) {
    const queryRunner = this.dataSource.createQueryRunner();

    //connect to the data base
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //increase the recommendation
      tea.recommendations++;

      //creat new event
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_tea';
      recommendEvent.type = 'tea';
      recommendEvent.payload = { teaId: tea.id };

      //save the tea and event entity
      await queryRunner.manager.save(tea);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      //incase any error, roll back the entire transaction
      await queryRunner.rollbackTransaction();
    } finally {
      //ether fall or success, at the end we need to close the connection with the DB
      await queryRunner.release();
    }
  }
}
