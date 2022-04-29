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

  create(createCoffeeDto: any) {
    this.tea.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.tea.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.tea.splice(coffeeIndex, 1);
    }
  }
}
