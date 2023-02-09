import { Injectable } from '@nestjs/common';
import { Langage } from 'src/langages/entities/langage.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'typeorm';
import { search } from './dto/search.dto';

@Injectable()
export class SearchService {
        async findByVille(input: search): Promise<User[]> {
                return await User.find({
                        relations: {
                                langage: true,
                                competence: true,
                        },
                        where: [
                                { city: Like(`%${input.ville}%`) },
                                { departement: Like(`%${input.departement}%`) },
                                { region: Like(`%${input.region}`) },
                                { pays: Like(`%${input.pays}`) },
                                { username: Like(`%${input.username}`) },
                                {
                                        langage: {
                                                langage_1: Like(
                                                        `%${input.langage}`
                                                ),
                                        },
                                },
                        ],
                });
        }

        async findByLangage(langage: string): Promise<Langage[]> {
                const data = await Langage.findAndCountBy({ user: true });

                return data[0];
        }
}
