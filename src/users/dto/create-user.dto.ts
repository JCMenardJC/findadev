import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPostalCode, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @Column()
    mail: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    username: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    prenom: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    nom: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    password: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    adress_line: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsPostalCode('any')
    @Column()
    zipCode: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    city: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    region: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    departement: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    pays: string;
}
