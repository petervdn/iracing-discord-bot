import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column('text')
  discordUserId: string | undefined;

  @Column('text')
  iRacingUserId: string | undefined;

  @Column('text')
  iRatingHistory: string | undefined;
}
