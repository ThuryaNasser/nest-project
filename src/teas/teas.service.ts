import { Injectable, NotFoundException } from '@nestjs/common';
import { Tea } from './entities/teas.entities';

@Injectable()
//REMEMBER: each service is considered as provider
export class TeasService {
  private tea: Tea[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.tea;
  }

  findOne(id: string) {
    const tea = this.tea.find((item) => item.id === +id);

    //send error when use try to reach id doesn't exist
    if (!tea) {
      throw new NotFoundException(`Tea with the id #${id} not found`);
    }

    return tea;
  }

  create(createTeaDto: any) {
    this.tea.push(createTeaDto);
  }

  update(id: string, updateTeaDto: any) {
    const existingTea = this.findOne(id);
    if (existingTea) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const teaIndex = this.tea.findIndex((item) => item.id === +id);
    if (teaIndex >= 0) {
      this.tea.splice(teaIndex, 1);
    }
    //send error when use try to reach id doesn't exist
    if (!teaIndex) {
      throw new NotFoundException(`Tea with the id #${id} not found`);
    }
  }
}
