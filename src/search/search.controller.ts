import { Body, Get, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { searchDto } from './dto/search.dto';
import { SearchService } from './search.service';

@ApiTags('Rechercher')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}
    @Get()
    async searchByVille(@Body() input: searchDto) {
        const listDevByVille = await this.searchService.findByVille(input);
        console.log(listDevByVille);

        return listDevByVille;
    }
}
