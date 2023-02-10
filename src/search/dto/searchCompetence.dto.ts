import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchCompetenceDto {
    @ApiProperty()
    competence: string[];
}
