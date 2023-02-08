import { Body, Get, Controller } from '@nestjs/common';
import { searchByVille } from './dto/searchByVille.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
        constructor(private readonly searchService: SearchService) {}
        @Get()
        async searchByVille(@Body() input: searchByVille) {
                const listDevByVille = await this.searchService.findByVille(
                        input.ville
                );
                console.log(listDevByVille);

                return listDevByVille;
        }
}
