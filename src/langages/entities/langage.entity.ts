import { type } from 'os';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique(['user'])
@Entity()
export class Langage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  user: number;

  @Column('varchar')
  langage_1: string;

  @Column({ type: 'varchar', default: null })
  langage_2: string;

  @Column({ type: 'varchar', default: null })
  langage_3: string;

  @Column({ type: 'varchar', default: null })
  langage_4: string;

  @Column({ type: 'varchar', default: null })
  langage_5: string;

  @Column({ type: 'varchar', default: null })
  langage_6: string;
}
