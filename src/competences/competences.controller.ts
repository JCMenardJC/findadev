import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import {} from '@nestjs/common/decorators';
import { Response } from 'express';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity';

@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService) {}

  @Post()
  async create(
    @Body() createCompetenceDto: CreateCompetenceDto,
    @Res() res: Response,
  ) {
    const verifUser = await Competence.findOneBy({
      user: createCompetenceDto.user,
    });
    console.log(verifUser);

    if (verifUser) {
      res.status(401).json({
        status: '401',
        message: 'This client has already post his competences !!',
      });
    } else {
      this.competencesService.create(createCompetenceDto);
      res.status(201).json({
        status: '201',
        message: 'Success',
        data: this.competencesService,
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
