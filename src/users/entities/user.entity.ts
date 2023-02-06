import { Competence } from 'src/competences/entities/competence.entity';
import { Langage } from 'src/langages/entities/langage.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  mail: string;

  @Column({ type: 'varchar' })
  nom: string;

  @Column({ type: 'varchar' })
  prenom: string;

  @Column({ type: 'varchar' })
  pseudo: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar' })
  adress_line: string;

  @Column({ type: 'varchar' })
  zipCode: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  region: string;

  @Column({ type: 'varchar' })
  departement: string;

  @Column({ type: 'varchar' })
  pays: string;

  @OneToMany(() => Langage, (langage) => langage.id)
  langage: number;
  @OneToMany(() => Competence, (competence) => competence.id)
  competence: number;
  @OneToOne(() => Presentation, (presentation) => presentation.id)
  presentation: number;
}
