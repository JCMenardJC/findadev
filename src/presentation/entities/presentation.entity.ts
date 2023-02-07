import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('presentations')
export class Presentation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: number;

  @Column({ nullable: false })
  langage: string;

  @Column({ nullable: false })
  presentation: string;

  @Column({ nullable: false })
  nationalité: string;

  @Column()
  genre: string;

  @Column()
  age: number;

  @Column()
  hobbies: string;
}
