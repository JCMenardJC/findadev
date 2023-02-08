import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'typeorm';

@Injectable()
export class SearchService {
        async findByVille(ville: string) {
                return await User.findBy({
                        city: Like(`%${ville}%`),
                });
        }
}
