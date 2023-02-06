import { IsBoolean } from 'class-validator';

export class CreateFriendDto {
  @IsBoolean()
  response: boolean;
}
