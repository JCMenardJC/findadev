import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class search {
    @IsString()
    @IsOptional()
    @ApiProperty()
    ville: string;
    @IsOptional()
    @IsString()
    @ApiProperty()
    departement: string;
    @IsOptional()
    @IsString()
    @ApiProperty()
    region: string;
    @IsOptional()
    @IsString()
    @ApiProperty()
    pays: string;
    @IsOptional()
    @IsString()
    @ApiProperty()
    username: string;
    @IsOptional()
    @IsString()
    @ApiProperty()
    langage: string;
    @IsOptional()
    @IsString()
    @ApiProperty()
    competence: string;
}
