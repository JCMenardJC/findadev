import { PartialType } from '@nestjs/mapped-types';
import { CreateLangageDto } from './create-langage.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLangageDto extends PartialType(CreateLangageDto) {
  @IsOptional()
  @ApiProperty()
  langage_1: string;
}
