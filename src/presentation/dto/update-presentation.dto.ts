import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePresentationDto } from './create-presentation.dto';

export class UpdatePresentationDto extends PartialType(CreatePresentationDto) {
    @IsString()
    @IsOptional()
    langage: string;

    @IsString()
    @IsOptional()
    presentation: string;

    @IsString()
    @IsOptional()
    nationalité: string;

    @IsOptional()
    @IsString()
    genre: string;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @IsString()
    hobbies: string;
}
