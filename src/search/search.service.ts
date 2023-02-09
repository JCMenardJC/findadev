import { Injectable } from '@nestjs/common';
import { find } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'typeorm';

@Injectable()
export class SearchService {
        async findByVille(ville: string): Promise<User[]> {
                return await User.findBy({
                        city: Like(`%${ville}%`),
                });
        }

        async findByLangage(langage: string): Promise<User[]> {
                const data = await User.findBy({ langage: true });

                return data;
        }
}
