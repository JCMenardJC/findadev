import { ApiProperty } from '@nestjs/swagger';
import { Competence } from 'src/competences/entities/competence.entity';
import { Langage } from 'src/langages/entities/langage.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';
import { BaseEntity } from 'typeorm';

export class ProfilDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    presentation: Presentation | any;
    @ApiProperty()
    competences: Competence | any;
    @ApiProperty()
    langages: Langage | any;
}
