import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCompetenceDto {
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @IsNotEmpty()
  @IsString()
  competence1: string;

  @IsOptional()
  @IsString()
  competence2: string;

  @IsOptional()
  @IsString()
  competence3: string;

  @IsOptional()
  @IsString()
  competence4: string;

  @IsOptional()
  @IsString()
  competence5: string;

  @IsOptional()
  @IsString()
  competence6: string;
}
