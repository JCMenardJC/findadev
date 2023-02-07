import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePresentationDto {
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @IsNotEmpty()
  @IsString()
  langage: string;

  @IsNotEmpty()
  @IsString()
  presentation: string;

  @IsNotEmpty()
  @IsString()
  nationalité: string;

  @IsOptional()
  @IsString()
  genre: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  hobbies: string;
}
