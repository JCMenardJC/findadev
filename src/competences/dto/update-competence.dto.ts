import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { CreateCompetenceDto } from "./create-competence.dto";

export class UpdateCompetenceDto extends PartialType(CreateCompetenceDto) {
  @IsOptional()
  user: User;

  @IsOptional()
  competence1?: string;

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
