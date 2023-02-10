import { Injectable } from '@nestjs/common';
import { Langage } from 'src/langages/entities/langage.entity';
import { User } from 'src/users/entities/user.entity';
import { ILike, Like } from 'typeorm';
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
                { departement: ILike(`%${input.departement}%`) },
                { region: ILike(`%${input.region}`) },
                { pays: ILike(`%${input.pays}`) },
                { username: ILike(`%${input.username}`) },

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
}
