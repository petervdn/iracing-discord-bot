import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column('text')
  firstName: string | undefined;

  @Column('text')
  lastName: string | undefined;

  @Column('integer')
  age: number | undefined;
}
