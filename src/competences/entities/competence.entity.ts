import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Competence extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
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
