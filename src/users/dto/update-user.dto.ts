import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsPostalCode, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEmail()
    @Column()
    mail: string;
    @IsOptional()
    @IsString()
    @Column()
    username: string;
    @IsOptional()
    @IsString()
    @Column()
    prenom: string;
    @IsOptional()
    @IsString()
    @Column()
    nom: string;
    @IsOptional()
    @IsString()
    password: string;
    @IsOptional()
    @IsString()
    @Column()
    adress_line: string;
    @IsOptional()
    @IsPostalCode('any')
    @Column()
    zipCode: string;
    @IsOptional()
    @IsString()
    @Column()
    city: string;
    @IsOptional()
    @IsString()
    @Column()
    region: string;
    @IsOptional()
    @IsString()
    @Column()
    departement: string;
    @IsOptional()
    @IsString()
    @Column()
    pays: string;
}
