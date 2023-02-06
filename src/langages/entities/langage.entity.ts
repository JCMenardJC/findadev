import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Langage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  langage_1: string;

  @Column()
  langage_2: string;

  @Column()
  langage_3: string;

  @Column()
  langage_4: string;

  @Column()
  langage_5: string;

  @Column()
  langage_6: string;
}
