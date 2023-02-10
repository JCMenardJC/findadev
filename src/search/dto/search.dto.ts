import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class searchDto {
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
    competence: string;
}
