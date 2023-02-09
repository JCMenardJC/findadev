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

@Entity()
export class Langage extends BaseEntity {
        static findAll() {
                throw new Error('Method not implemented.');
        }
        @PrimaryGeneratedColumn()
        id: number;
        @OneToOne(() => User, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                eager: true,
        })
        user: User;

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
