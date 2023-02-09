import { Body, Get, Controller } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { searchByVille } from './dto/searchByVille.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
        constructor(
                private readonly searchService: SearchService,
                private readonly usersService: UsersService
        ) {}

        @Get('ville')
        async searchByVille(@Body() input: searchByVille) {
                const listDevByVille = await this.searchService.findByVille(
                        input.ville
                );
                console.log(listDevByVille);

                return listDevByVille;
        }

        @Get('langages')
        async searchByLangage(@Body() input: any) {
                console.log(input);

                return await this.searchService.findByLangage(input['input']);
        }
}
