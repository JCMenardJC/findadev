import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateCompetenceDto {
  @IsOptional()
  user: User;

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
