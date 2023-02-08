import { Injectable } from '@nestjs/common';
import { Competence } from 'src/competences/entities/competence.entity';
import { Langage } from 'src/langages/entities/langage.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';
import { User } from 'src/users/entities/user.entity';
import { ProfilDto } from './profil-dto';

@Injectable()
export class ProfilService {
        async findOnefilter(user: number): Promise<any | undefined> {
                const dataUser = await Langage.findOneBy({ user });

                //fromEntries pour transformer le tableau obtenu par entries de l'objet cible que j'ai filtré pour obtenir seulement la donnée voulue
                const test = Object.fromEntries(
                        Object.entries(dataUser).filter((data) => data[1])
                );
                //console.log(test);

                if (dataUser) {
                        return test;
                }
                return undefined;
        }
        async getProfil(user_id: number): Promise<ProfilDto | undefined> {
                const newProfil = new ProfilDto();

                newProfil.username = (
                        await User.findOneBy({ id: user_id })
                ).username;
                if (!newProfil.username) {
                        return undefined;
                }
                /* const dataPresentation = await Presentation.findOneBy({
                        user: user_id,
                });
                const newPresentation = Object.fromEntries(
                        Object.entries(dataPresentation).filter(
                                (data) => data[1]
                        )
                );
                newProfil.presentation = newPresentation; */
                newProfil.presentation = await Presentation.findOneBy({
                        user: user_id,
                });
                const dataCompetence = await Competence.findOneBy({
                        user: user_id,
                });
                const newCompetence = Object.fromEntries(
                        Object.entries(dataCompetence).filter((data) => data[1])
                );
                newProfil.competences = newCompetence;

                const dataLangage = await Langage.findOneBy({ user: user_id });
                const newLangage = Object.fromEntries(
                        Object.entries(dataLangage).filter((data) => data[1])
                );
                newProfil.langages = newLangage;

                return newProfil;
        }
}
