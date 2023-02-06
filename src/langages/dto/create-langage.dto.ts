import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLangageDto {
  @IsOptional()
  @IsNumber()
  user: number;
  @IsNotEmpty()
  @IsString()
  langage_1: string;
  @IsOptional()
  @IsString()
  langage_2: string;
  @IsOptional()
  @IsString()
  langage_3: string;
  @IsOptional()
  @IsString()
  langage_4: string;
  @IsOptional()
  @IsString()
  langage_5: string;
  @IsOptional()
  @IsString()
  langage_6: string;
}
