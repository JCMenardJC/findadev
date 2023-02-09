import { Injectable } from '@nestjs/common';
import { find } from 'rxjs';
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
                        langage_1: Like(`%${input.langage}`),
                        langage_2: Like(`%${input.langage}`),
                        langage_4: Like(`%${input.langage}`),
                        langage_3: Like(`%${input.langage}`),
                        langage_5: Like(`%${input.langage}`),
                        langage_6: Like(`%${input.langage}`),
                    },
                },
                {
                    competence: {
                        competence1: Like(`%${input.competence}`),
                        competence2: Like(`%${input.competence}`),
                        competence3: Like(`%${input.competence}`),
                        competence4: Like(`%${input.competence}`),
                        competence5: Like(`%${input.competence}`),
                        competence6: Like(`%${input.competence}`),
                    },
                },
            ],
        });
    }

    async findByLangage(): Promise<Langage[]> {
        const data = await Langage.findAndCount();

        console.log(data);
        if (data[0]) return;
    }
}
