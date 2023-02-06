import { Injectable } from '@nestjs/common';
import { Competence } from 'src/competences/entities/competence.entity';
import { Langage } from 'src/langages/entities/langage.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';
import { User } from 'src/users/entities/user.entity';
import { ProfilDto } from './profil-dto';

@Injectable()
export class ProfilService {
  async getProfil(user_id: number): Promise<ProfilDto | undefined> {
    const newProfil = new ProfilDto();

    newProfil.pseudo = (await User.findOneBy({ id: user_id })).pseudo;
    if (!newProfil.pseudo) {
      return undefined;
    }
    newProfil.presentation = await Presentation.findOneBy({ user: user_id });

    newProfil.competences = await Competence.findOneBy({ user: user_id });

    newProfil.langages = await Langage.findOneBy({ user: user_id });

    return newProfil;
  }
}
