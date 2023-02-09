import { Body, Get, Controller } from '@nestjs/common';
import { Langage } from 'src/langages/entities/langage.entity';
import { search } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}
    /*     @Get()
    async searchByVille(@Body() input: search) {
        const listDevByVille = await this.searchService.findByVille(input);
        console.log(listDevByVille);

        return listDevByVille;
    } */
    @Get()
    async searchLangage(@Body() input: search) {
        const data = await this.searchService.findByLangage();
        /*  console.log(data);

        const origincheck = Object.keys(Langage).map((data) => data);
        console.log(origincheck);

        const inputCheck = Object.keys(data).map((data) =>
            origincheck.includes(data) ? data : false,
        );

        if (inputCheck.includes(false)) {
            console.log(inputCheck);

            return inputCheck;
        }*/ return data;
    }
}
