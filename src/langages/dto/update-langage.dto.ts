import { PartialType } from '@nestjs/mapped-types';
import { CreateLangageDto } from './create-langage.dto';
import { IsOptional } from 'class-validator';

export class UpdateLangageDto extends PartialType(CreateLangageDto) {
  @IsOptional()
  langage_1: string;
}
