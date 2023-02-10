import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateCompetenceDto {
  @IsOptional()
  user: User;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  competence1: string;

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
