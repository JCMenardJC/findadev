import { Injectable } from '@nestjs/common';
import { Langage } from 'src/langages/entities/langage.entity';
import { User } from 'src/users/entities/user.entity';
import { ILike } from 'typeorm';
import { searchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
    async findByVille(input: searchDto): Promise<User[]> {
        return await User.find({
            relations: {
                langage: true,
                competence: true,
            },
            where: [
                { city: ILike(`%${input.ville}%`) },
                { departement: ILike(`%${input.departement}%`) },
                { region: ILike(`%${input.region}`) },
                { pays: ILike(`%${input.pays}`) },
                { username: ILike(`%${input.username}`) },
                {
                    langage: {
                        langage_1: ILike(`%${input.langage}`),
                        langage_2: ILike(`%${input.langage}`),
                        langage_4: ILike(`%${input.langage}`),
                        langage_3: ILike(`%${input.langage}`),
                        langage_5: ILike(`%${input.langage}`),
                        langage_6: ILike(`%${input.langage}`),
                    },
                },
                {
                    competence: {
                        competence1: ILike(`%${input.competence}`),
                        competence2: ILike(`%${input.competence}`),
                        competence3: ILike(`%${input.competence}`),
                        competence4: ILike(`%${input.competence}`),
                        competence5: ILike(`%${input.competence}`),
                        competence6: ILike(`%${input.competence}`),
                    },
                },
            ],
        });
    }

    async findByLangage(input: searchDto): Promise<Langage[] | any> {
        const data = await Langage.find({
            relations: { user: true },
            select: {
                id: false,
            },
        });

        const test = data.map((data) => Object.values(data).filter(Boolean));

        return test;
    }
}
