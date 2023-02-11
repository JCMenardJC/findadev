import { Body, Post, Controller, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { searchDto } from './dto/search.dto';
import { SearchCompetenceDto } from './dto/searchCompetence.dto';
import { SearchLangageDto } from './dto/searchLangage.dto';
import { SearchService } from './search.service';
@ApiBearerAuth()
@ApiTags('Rechercher')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Post('ville')
    async searchByVille(@Body() input: searchDto) {
        const listDevByVille = await this.searchService.findByVille(input);
        if (listDevByVille.length == 0) {
            throw new NotFoundException(
                `Aucun utilisateur ne correspond a aucun des critéres de recherche saisies`,
            );
        }

        return listDevByVille;
    }

    @Post('langages')
    async searchByLangage(@Body() input: SearchLangageDto) {
        const data = await this.searchService.findByLangage(input.langage);

        if (data.length == 0) {
            throw new NotFoundException(
                `Aucun utilisateur n'utilisent ce langage`,
            );
        }
        return data;
    }
    @Post('competence')
    async searchByCompetence(@Body() input: SearchCompetenceDto) {
        const data = await this.searchService.findByCompetence(
            input.competence,
        );
        if (data.length == 0) {
            throw new NotFoundException(
                `Aucun utilisateur ne possédent cette compétence`,
            );
        }
        return data;
    }
}
