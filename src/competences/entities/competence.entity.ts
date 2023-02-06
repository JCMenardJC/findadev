import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Competence extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  user: number;

  @Column({ type: 'varchar' })
  competence1: string;

  @Column({ type: 'varchar' })
  competence2: string;

  @Column({ type: 'varchar' })
  competence3: string;

  @Column({ type: 'varchar' })
  competence4: string;

  @Column({ type: 'varchar' })
  competence5: string;

  @Column({ type: 'varchar' })
  competence6: string;
}
