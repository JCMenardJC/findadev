import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
        controllers: [SearchController],
        providers: [SearchService, UsersService],
})
export class SearchModule {}
