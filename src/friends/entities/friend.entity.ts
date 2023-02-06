import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Friend extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: number;

  @Column({ type: 'varchar' })
  pseudoAsked: string;

  @Column({ type: 'boolean', default: false })
  response: boolean;
}
