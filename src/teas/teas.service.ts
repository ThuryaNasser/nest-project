import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeaDto } from './dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto';
import { Tea } from './entities/tea.entity';

@Injectable()
//REMEMBER: each service is considered as provider
export class TeasService {
  constructor(
    @InjectRepository(Tea)
    private readonly teaRepository: Repository<Tea>,
  ) {}

  findAll() {
    return this.teaRepository.find();
  }

  async findOne(id: string) {
    const tea = await this.teaRepository.findOne(id);

    //send error when use try to reach id doesn't exist
    if (!tea) {
      throw new NotFoundException(`Tea with the id #${id} not found`);
    }

    return tea;
  }

  create(createTeaDto: CreateTeaDto) {
    const tea = this.teaRepository.create(createTeaDto);
    return this.teaRepository.save(tea);
  }

  async update(id: string, updateTeaDto: UpdateTeaDto) {
    const existingTea = await this.teaRepository.preload({
      id: +id,
      ...updateTeaDto,
    });
    if (!existingTea) {
      throw new NotFoundException(`Tea with the id #${id} not found`);
    }
    return this.teaRepository.save(existingTea);
  }

  async remove(id: string) {
    const teaIndex = await this.teaRepository.findOne(id);
    return this.teaRepository.remove(teaIndex);
  }
}
