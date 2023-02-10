import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateLangageDto {
        @IsOptional()
        @ApiProperty()
        user: User;
        @IsNotEmpty()
        @IsString()
        @ApiProperty()
        langage_1: string;
        @IsOptional()
        @IsString()
        @ApiProperty()
        langage_2: string;
        @IsOptional()
        @IsString()
        @ApiProperty()
        langage_3: string;
        @IsOptional()
        @IsString()
        @ApiProperty()
        langage_4: string;
        @IsOptional()
        @IsString()
        @ApiProperty()
        langage_5: string;
        @IsOptional()
        @IsString()
        @ApiProperty()
        langage_6: string;
}
