import { Body, Get, Controller } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { search } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
        constructor(
                private readonly searchService: SearchService,
                private readonly usersService: UsersService
        ) {}

        @Get('ville')
        async searchByVille(@Body() input: search) {
                const listDevByVille = await this.searchService.findByVille(
                        input
                );
                console.log(listDevByVille);

                return listDevByVille;
        }

        @Get('langages')
        async searchByLangage(@Body() input: search) {
                const data = await this.searchService.findByLangage(
                        input.langage
                );
                return data;
        }
}
