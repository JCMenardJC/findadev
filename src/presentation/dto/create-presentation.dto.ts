import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePresentationDto {
  @IsNotEmpty()
  @IsNumber()
  UserId: number;

  @IsNotEmpty()
  @IsString()
  langue: string;

  @IsNotEmpty()
  @IsString()
  presentation: string;

  @IsNotEmpty()
  @IsString()
  nationnalitée: string;

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
