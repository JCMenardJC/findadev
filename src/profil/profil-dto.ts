import { Competence } from 'src/competences/entities/competence.entity';
import { Langage } from 'src/langages/entities/langage.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';
import { BaseEntity } from 'typeorm';

export class ProfilDto {
    username: string;

    presentation: Presentation | any;

    competences: Competence | any;

    langages: Langage | any;
}
