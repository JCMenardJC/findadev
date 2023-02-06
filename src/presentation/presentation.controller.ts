import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('presentation')
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPresentationDto: CreatePresentationDto) {
    const data = await this.presentationService.createPresentation(
      createPresentationDto,
    );
    if (!createPresentationDto) {
      throw new BadRequestException('informations manquantes');
    } else {
      return data;
    }
  }


  @Get()
  findAll() {
    const data = this.presentationService.findAllPresentation();
    return data;
  }


  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.presentationService.findOnePresentation(+id);

    if (!data) {
      throw new NotFoundException("l'ID ne correspond à aucune présentation");
    }
    return data;
  }


  @UseGuards(JwtAuthGuard)
  @Patch()
  async findPresentationUpdate(
    @Body() updatePresentationDto: UpdatePresentationDto,
    id: number,
  ) {
    const data = await this.presentationService.findOnePresentation(+id);

    if (!data) {
      throw new NotFoundException("l'ID' ne correspond à aucune présentation");
    }
    return await this.presentationService.updatePresentation(
      data.id,
      updatePresentationDto,
    );
  }


  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param('id') id: string) {
    return this.presentationService.removePresentation(+id);
  }
}
