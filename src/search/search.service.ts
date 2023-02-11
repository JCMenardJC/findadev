import { Injectable } from '@nestjs/common';
import { Competence } from 'src/competences/entities/competence.entity';
import { Langage } from 'src/langages/entities/langage.entity';
import { User } from 'src/users/entities/user.entity';
import { ILike } from 'typeorm';
import { searchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
    async findByVille(input: searchDto): Promise<User[] | any> {
        const data = await User.find({
            relations: {
                langage: true,
                competence: true,
            },
            where: [
                { city: ILike(`%${input.ville}%`) },
                {
                    departement: ILike(`%${input.departement}%`),
                },
                { region: ILike(`%${input.region}`) },
                { pays: ILike(`%${input.pays}`) },
                { username: ILike(`%${input.username}`) },
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
                .filter((data) => typeof data === 'string'),
        );

        const filter_Obj = dataLangages.map((data) =>
            Object.values(data)
                .filter(Boolean)
                .filter((data) => typeof data === 'object'),
        );

        const indexS = filter_Obj.map((data, i) => [data[0].id, filter_Str[i]]);

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
            (data, pos) => listUser.indexOf(data) === pos,
        );

        let userbyLangage = [];
        let cpt = 0;
        while (cpt < lastlistUser.length) {
            let id = lastlistUser[cpt];
            const user = await User.findOneBy({ id });
            userbyLangage.push(user);
            cpt++;
        }

        return userbyLangage;
    }
    async findByCompetence(competence: string[]): Promise<Langage[] | any> {
        const dataCompetence = await Competence.find({
            relations: { user: true },
            select: {
                id: false,
                user: { id: true },
            },
        });
        const filter_Str = dataCompetence.map((data) =>
            Object.values(data)
                .filter(Boolean)
                .filter((data) => typeof data === 'string'),
        );

        const filter_Obj = dataCompetence.map((data) =>
            Object.values(data)
                .filter(Boolean)
                .filter((data) => typeof data === 'object'),
        );

        const indexS = filter_Obj.map((data, i) => [data[0].id, filter_Str[i]]);

        let listUser = [];
        let x = 0;
        while (x < indexS.length) {
            let cptLang = 0;
            while (cptLang < competence.length) {
                if (indexS[x][1].includes(competence[cptLang])) {
                    listUser.push(indexS[x][0]);
                }
                cptLang++;
            }
            x++;
        }

        let lastlistUser = listUser.filter(
            (data, pos) => listUser.indexOf(data) === pos,
        );

        let userbyCompetence = [];
        let cpt = 0;
        while (cpt < lastlistUser.length) {
            let id = lastlistUser[cpt];
            const user = await User.findOneBy({ id });
            userbyCompetence.push(user);
            cpt++;
        }

        return userbyCompetence;
    }
}
