import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/**
 an entity represent a relationship between type script class and database table 
 */

@Entity() // sql table === 'tea'
export class Tea {
  @PrimaryGeneratedColumn() //auto increment by default
  id: number;

  @Column() // required by default
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavors: string[];
}
