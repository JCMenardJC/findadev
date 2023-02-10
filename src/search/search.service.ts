import { Injectable } from '@nestjs/common';
import { IsBIC, isNotEmpty, NotEquals } from 'class-validator';
import { Langage } from 'src/langages/entities/langage.entity';
import { User } from 'src/users/entities/user.entity';
import { IsNull, Like, Raw } from 'typeorm';
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

        async findByLangage(langage: string[]): Promise<Langage[] | any> {
                const dataLangages = await Langage.find({
                        relations: { user: true },
                        select: {
                                id: false,
                                user: { id: true },
                        },
                });
                const filter_Str = dataLangages.map((data) =>
                        Object.values(data)
                                .filter(Boolean)
                                .filter((data) => typeof data === 'string')
                );

                const filter_Obj = dataLangages.map((data) =>
                        Object.values(data)
                                .filter(Boolean)
                                .filter((data) => typeof data === 'object')
                );

                const indexS = filter_Obj.map((data, i) => [
                        data[0].id,
                        filter_Str[i],
                ]);

                let listUser = [];
                let x = 0;
                while (x < indexS.length) {
                        let cptLang = 0;
                        while (cptLang < langage.length) {
                                if (indexS[x][1].includes(langage[cptLang])) {
                                        listUser.push(indexS[x][0]);
                                }
                                cptLang++;
                        }
                        x++;
                }

                let lastlistUser = listUser.filter(
                        (data, pos) => listUser.indexOf(data) === pos
                );

                let userbyLangage = [];
                let cpt = 0;
                while (cpt < lastlistUser.length) {
                        let id = lastlistUser[cpt];
                        const user = await User.findOneBy({ id });
                        userbyLangage.push(user);
                        cpt++;
                }
                console.log(listUser);

                return userbyLangage;
        }
}
