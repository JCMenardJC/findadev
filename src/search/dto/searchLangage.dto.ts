import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchLangageDto {
    @IsString()
    @ApiProperty()
    langage: string[];
}
