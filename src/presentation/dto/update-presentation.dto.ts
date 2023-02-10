import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePresentationDto } from './create-presentation.dto';

export class UpdatePresentationDto extends PartialType(CreatePresentationDto) {
    @IsString()
    @IsOptional()
    langage: string;

<<<<<<< HEAD
    @IsString()
    @IsOptional()
    presentation: string;
=======

  @ApiProperty()
  @IsString()
  @IsOptional()
  langage: string;
>>>>>>> 292582ccedc581c74652d7ef1d50e5974ef8f5e5

    @IsString()
    @IsOptional()
    nationalité: string;

<<<<<<< HEAD
    @IsOptional()
    @IsString()
    genre: string;
=======

  @ApiProperty()
  @IsString()
  @IsOptional()
  presentation: string;
>>>>>>> 292582ccedc581c74652d7ef1d50e5974ef8f5e5

    @IsOptional()
    @IsNumber()
    age: number;

<<<<<<< HEAD
    @IsOptional()
    @IsString()
    hobbies: string;
=======
  @ApiProperty()
  @IsString()
  @IsOptional()
  nationalité: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  genre: string;


  @ApiProperty()
  @IsOptional()
  @IsNumber()
  age: number;


  @ApiProperty()
  @IsOptional()
  @IsString()
  hobbies: string;
>>>>>>> 292582ccedc581c74652d7ef1d50e5974ef8f5e5
}
