import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './tea.flavor.entity';
/**
 - An entity represent a relationship between type script class and database table 

 - Relations are associations established between two or more tables,
   based on common fields from each table, often involving primary and foreign keys.

 - There are three types of relations:
   1- One-to-one relations: In these relations every row in the primary table has 
      one - and only one associated row in the foreign table. 
      In TypeOrm, we define these types of relations with the @OneToOne() decorator.

   2- One-to-many or Many-to-one relations: For these relations - every row in the primary table has 
      one or more related rows in the foreign table. 
      In TypeOrm, we define these types of relations with the  @OneToMany() and @ManyToOne() decorators.

   3- Many-to-many relations: This is when every row in the primary table has many related rows
      in the foreign table, and every record in the foreign table has many related rows in the primary table.
      In TypeOrm, we define these types of relations with the  @ManyToMany() decorator.

 - RELATIONS ARE NOT EAGERLY LOADED BY DEFAULT

 */

@Entity() // sql table === 'tea'
export class Tea {
  @PrimaryGeneratedColumn() //auto increment by default
  id: number;

  @Column() // required by default
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable() // to Join the 2 tables - only the OWNER-side does this
  @ManyToMany(
    () => Flavor, //to specify what is the type of the relation
    (flavor) => flavor.teas, // what is "teas" within the Flavor Entity
    {
      // to enable cascading for both inserts and updates
      cascade: true, // or optionally just insert or update => cascade: ['insert']
    },
  ) // 👈
  flavors: Flavor[];
}

/*
Generated Tea table in PostgreSQL Database

+-------------+--------------+----------------------------+
|                          tea                         |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| name   	    | varchar      |                            |
| brand       | varchar      |                            |
| flavors     | json         |                            |
+-------------+--------------+----------------------------+
*/
