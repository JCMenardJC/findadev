import { User } from "src/users/entities/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Unique(["user"])
@Entity()
export class Competence extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: number;

  @Column({ type: "varchar" })
  competence1: string;

  @Column({ type: "varchar", default: null })
  competence2: string;

  @Column({ type: "varchar", default: null })
  competence3: string;

  @Column({ type: "varchar", default: null })
  competence4: string;

  @Column({ type: "varchar", default: null })
  competence5: string;

  @Column({ type: "varchar", default: null })
  competence6: string;
}
