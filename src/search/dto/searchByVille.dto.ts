import { IsString, IsNotEmpty } from 'class-validator';

export class searchByVille {
        @IsNotEmpty()
        @IsString()
        ville: string;
}
