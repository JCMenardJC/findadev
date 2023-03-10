import { User } from 'src/users/entities/user.entity';
import {
        BaseEntity,
        Column,
        Entity,
        ManyToOne,
        PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Friend extends BaseEntity {
        @PrimaryGeneratedColumn()
        id: number;

        @ManyToOne(() => User, (user) => user.id, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                eager: true,
        })
        user: number;

        @Column({ type: 'varchar' })
        pseudoAsked: string;

        @Column({ type: 'boolean', default: false })
        response: boolean;
}
