import { Body, Get, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { searchDto } from './dto/search.dto';
import { SearchLangageDto } from './dto/searchLangage.dto';
import { SearchService } from './search.service';

@ApiTags('Rechercher')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get('ville')
    async searchByVille(@Body() input: searchDto) {
        const listDevByVille = await this.searchService.findByVille(input);
        console.log(listDevByVille);

        return listDevByVille;
    }

    @Get('langages')
    async searchByLangage(@Body() input: SearchLangageDto) {
        const data = await this.searchService.findByLangage(input.langage);
        return data;
    }
}
