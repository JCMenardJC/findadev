import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchLangageDto {
    @ApiProperty()
    langage: string[];
}
