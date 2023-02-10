import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPostalCode, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    @Column()
    mail: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Column()
    username: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Column()
    prenom: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Column()
    nom: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Column()
    password: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Column()
    adress_line: string;
    @ApiProperty()
    @IsOptional()
    @IsPostalCode('any')
    @Column()
    zipCode: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Column()
    city: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Column()
    region: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Column()
    departement: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Column()
    pays: string;
}
