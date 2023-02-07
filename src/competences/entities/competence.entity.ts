import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique(['user'])
@Entity()
@Unique(['user'])
export class Competence extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: number;

  @Column({ type: 'varchar' })
  competence1: string;

  @Column({ type: 'varchar', default: null })
  competence2: string;

  @Column({ type: 'varchar', default: null })
  competence3: string;

  @Column({ type: 'varchar', default: null })
  competence4: string;

  @Column({ type: 'varchar', default: null })
  competence5: string;

  @Column({ type: 'varchar', default: null })
  competence6: string;
}
