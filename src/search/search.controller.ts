import { Body, Get, Controller } from '@nestjs/common';
import { search } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}
    @Get()
    async searchByVille(@Body() input: search) {
        const listDevByVille = await this.searchService.findByVille(input);
        console.log(listDevByVille);

        return listDevByVille;
    }
}
