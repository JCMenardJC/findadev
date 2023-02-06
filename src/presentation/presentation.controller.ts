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
} from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';

@Controller('presentation')
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) {}

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

  @Delete()
  remove(@Param('id') id: string) {
    return this.presentationService.removePresentation(+id);
  }
}
