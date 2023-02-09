import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePresentationDto } from './create-presentation.dto';

export class UpdatePresentationDto extends PartialType(CreatePresentationDto) {


  @ApiProperty()
  @IsString()
  @IsOptional()
  langage: string;



  @ApiProperty()
  @IsString()
  @IsOptional()
  presentation: string;


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
}
