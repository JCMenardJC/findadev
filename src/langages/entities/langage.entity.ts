import { type } from 'os';
import { User } from 'src/users/entities/user.entity';
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Unique(['user'])
@Entity()
export class Langage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn()
    user: number;

    @Column('varchar')
    langage_1: string;

    @Column({ type: 'varchar', default: null })
    langage_2: string;

    @Column({ type: 'varchar', default: null })
    langage_3: string;

    @Column({ type: 'varchar', default: null })
    langage_4: string;

    @Column({ type: 'varchar', default: null })
    langage_5: string;

    @Column({ type: 'varchar', default: null })
    langage_6: string;
}
