import { Exclude } from 'class-transformer';
import { Langage } from 'src/langages/entities/langage.entity';
import {
        BaseEntity,
        Column,
        Entity,
        JoinColumn,
        OneToOne,
        PrimaryGeneratedColumn,
        Unique,
} from 'typeorm';

@Entity()
@Unique(['mail', 'username'])
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
        username: string;
        @Column({ type: 'varchar', select: false })
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

        @OneToOne(() => Langage, (langage) => langage.user)
        @JoinColumn()
        langage: Langage;
}
