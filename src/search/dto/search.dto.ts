import { IsString, IsOptional } from 'class-validator';
import { Langage } from 'src/langages/entities/langage.entity';

export class searchDto {
    @IsString()
    @IsOptional()
    ville: string;
    @IsOptional()
    @IsString()
    departement: string;
    @IsOptional()
    @IsString()
    region: string;
    @IsOptional()
    @IsString()
    pays: string;
    @IsOptional()
    @IsString()
    username: string;
    @IsOptional()
    langage: Langage;
    @IsOptional()
    @IsString()
    /*  langage_2: string;
    @IsOptional()
    @IsString()
    langage_3: string;
    @IsOptional()
    @IsString()
    langage_1: string;
    @IsOptional()
    @IsString()
    langage_1: string; */
    @IsOptional()
    @IsString()
    competence: string;
}
