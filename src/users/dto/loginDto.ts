import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    username: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Column()
    password: string;
}
