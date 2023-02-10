import { Body, Get, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { search } from './dto/search.dto';
import { SearchService } from './search.service';


@ApiTags('Rechercher')
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
        async searchByLangage(@Body() input: any) {
                console.log(input);

                return await this.searchService.findByLangage(input);
        }
}
