import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePresentationDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  langage: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  presentation: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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
