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
  Request,
} from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EStatus } from 'src/constants/enum';
import { Presentation } from './entities/presentation.entity';


/**
 * Class permettant le contrôle des données entrantes et la gestion des erreurs pour les requêtes "présentation"
 * * **.create()** : Contrôle préalable à l'ajout d'une nouvelle "présentation"
 * * **.findAll()** : Contrôle préalable à la récupération de toutes les "présentation"
 * * **.findOne()** : Contrôle préalable à la récupération d'une "présentation" par son ID
 * * **.findPresentationUpdate()** : Contrôle préalable à la modification d'un order par son ID
 * * **.remove()**: Contrôle préalable à la suppression de la "présentation" de l'user
 */
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
  @Patch(':id')
  async findPresentationUpdate(@Param('id') id: number, @Body() updatePresentationDto: UpdatePresentationDto) {
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
  async remove(@Request() req) {
    const data = await Presentation.findOneBy(req.user.user_id);

    if (!data) {
      throw new NotFoundException('Votre présentation a deja été supprimée');
    }
    const presentationRemoved = await this.presentationService.removePresentation(req.user.user_id)
    return {
      status: EStatus.OK,
      message: "Votre présentation a été supprimée",
      data: presentationRemoved
    }
  }
}
