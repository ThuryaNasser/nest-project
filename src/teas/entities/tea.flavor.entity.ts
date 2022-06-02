import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tea } from './tea.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => Tea, //to specify what is the type of the relation
    (tea) => tea.flavors, // what is "flavor" within the tea Entity
  ) // 👈
  teas: Tea[];
}
