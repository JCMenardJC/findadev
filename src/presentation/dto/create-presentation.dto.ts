import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePresentationDto {
  /* @IsNotEmpty()
  @IsNumber()
<<<<<<< HEAD
  user: number;
=======
  UserId: number; */
>>>>>>> 951bf998e1ef37005deffc0e4c6df7e502cd3cd7

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
