import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePresentationDto } from './create-presentation.dto';

export class UpdatePresentationDto extends PartialType(CreatePresentationDto) {

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    langue: string


    @IsNotEmpty()
    @IsString()
    @IsOptional()
    presentation: string


    @IsNotEmpty()
    @IsString()
    @IsOptional()
    nationnalitée: string


    @IsOptional()
    @IsString()
    genre: string

    @IsOptional()
    @IsNumber()
    age: number


    @IsOptional()
    @IsString()
    hobbies: string





}
