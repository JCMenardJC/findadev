import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  mail: string;

  @Column({ type: 'varchar' })
  username: string;

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
}
