import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
/**
 * indexes are spacial key that the DB can use to help speed up this search,
 * we can define an index using the @Index decorator.
 */

// we can use this way: Composite index that contains Multiple columns
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // or this one for a single column: Composite index that contains Multiple columns
  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
