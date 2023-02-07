import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFriendDto {
  @IsString()
  @IsNotEmpty()
  pseudoAsked: string;

  @IsBoolean()
  @IsOptional()
  response: boolean;
}
