import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateLangageDto {
        @IsOptional()
        @IsNumber()
        user: number;
        @IsNotEmpty()
        @IsString()
        langage_1: string;
        @IsOptional()
        @IsString()
        langage_2: string;
        @IsOptional()
        @IsString()
        langage_3: string;
        @IsOptional()
        @IsString()
        langage_4: string;
        @IsOptional()
        @IsString()
        langage_5: string;
        @IsOptional()
        @IsString()
        langage_6: string;
}
