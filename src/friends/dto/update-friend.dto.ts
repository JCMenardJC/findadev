import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateFriendDto } from "./create-friend.dto";

export class UpdateFriendDto extends PartialType(CreateFriendDto) {
  @IsString()
  @IsOptional()
  pseudoAsked: string;

  @IsBoolean()
  response?: boolean;
}
