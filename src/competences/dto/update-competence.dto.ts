import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { CreateCompetenceDto } from "./create-competence.dto";

export class UpdateCompetenceDto extends PartialType(CreateCompetenceDto) {
  @IsOptional()
  user: User;

  @IsOptional()
  @ApiProperty()
  competence1?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  competence2: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  competence3: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  competence4: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  competence5: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  competence6: string;
}
