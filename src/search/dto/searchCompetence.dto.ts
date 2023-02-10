import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SearchCompetenceDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  competence: string[];
}
