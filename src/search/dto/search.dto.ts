import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class search {
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
    @IsString()
    langage: string;
    @IsOptional()
    @IsString()
    competence: string;
}
