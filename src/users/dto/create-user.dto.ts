import { IsEmail, IsNotEmpty, IsPostalCode, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Column()
  mail: string;
  @IsNotEmpty()
  @IsString()
  @Column()
  nom: string;
  @IsNotEmpty()
  @IsString()
  @Column()
  prenom: string;
  @IsNotEmpty()
  @IsString()
  @Column()
  pseudo: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  @Column()
  adress_line: string;
  @IsNotEmpty()
  @IsPostalCode('any')
  @Column()
  zipCode: string;
  @IsNotEmpty()
  @IsString()
  @Column()
  city: string;
  @IsNotEmpty()
  @IsString()
  @Column()
  region: string;
  @IsNotEmpty()
  @IsString()
  @Column()
  departement: string;
  @IsNotEmpty()
  @IsString()
  @Column()
  pays: string;
}
