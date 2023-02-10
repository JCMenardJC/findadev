import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFriendDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  pseudoAsked: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  response: boolean;
}
