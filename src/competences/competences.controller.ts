import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    UseGuards,
    Request,
} from '@nestjs/common';
import {} from '@nestjs/common/decorators';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity';

@Controller('competences')
export class CompetencesController {
    constructor(private readonly competencesService: CompetencesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createCompetenceDto: CreateCompetenceDto,

        @Request() req,
        @Res() res: Response,
    ) {
        const verifUser = await this.findOneById(req.user.user_id);
        console.log(verifUser);

        if (verifUser) {
            res.status(401).json({
                status: '401',
                message: 'This user has already post his competences !!',
            });
        } else {
            await this.competencesService.create(
                createCompetenceDto,
                req.user.user_id,
            );
            res.status(201).json({
                status: '201',
                message: 'Success',
                data: createCompetenceDto,
            });
        }
    }

    @Get()
    findAll() {
        return this.competencesService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: string) {
        return this.competencesService.findOneById(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCompetenceDto: UpdateCompetenceDto,
    ) {
        return this.competencesService.update(+id, updateCompetenceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.competencesService.remove(+id);
    }
}
