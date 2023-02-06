import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Langage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: number;

  @Column('varchar')
  langage_1: string;

  @Column('varchar')
  langage_2: string;

  @Column('varchar')
  langage_3: string;

  @Column('varchar')
  langage_4: string;

  @Column('varchar')
  langage_5: string;

  @Column('varchar')
  langage_6: string;
}
