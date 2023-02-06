import { Competence } from 'src/competences/entities/competence.entity';
import { Langage } from 'src/langages/entities/langage.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('presentations')
export class Presentation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  langue: string;

  @Column({ nullable: false })
  presentation: string;

  @Column({ nullable: false })
  nationnalitée: string;

  @Column()
  genre: string;

  @Column()
  age: number;

  @Column()
  hobbies: string;

  @OneToOne(() => User)
  user: User;
}
