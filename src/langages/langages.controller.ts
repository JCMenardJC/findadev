import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LangagesService } from './langages.service';
import { CreateLangageDto } from './dto/create-langage.dto';
import { UpdateLangageDto } from './dto/update-langage.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Langage } from './entities/langage.entity';
import { EMessageStatus, EStatus } from 'src/constants/enum';

@Controller('langages')
export class LangagesController {
  constructor(private readonly langagesService: LangagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createLangageDto: CreateLangageDto, @Request() req) {
    const dataCheck = await Langage.findOneBy({ user: req.user.user_id });
    if (dataCheck) {
      return {
        status: EStatus.FAIL,
        message: 'Vous avez déjà déclaré vos langages connus !!',
      };
    }
    const data = await this.langagesService.create(
      createLangageDto,
      req.user.user_id,
    );

    return {
      status: EStatus.FAIL,
      message: EMessageStatus.createdOK,
      data: data,
    };
  }

  @Get()
  async findAllLangages() {
    return await this.langagesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/byUser')
  async findOne(@Request() req) {
    return await this.langagesService.findOnefilter(req.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateLangageDto: UpdateLangageDto, @Request() req) {
    const dataUpdated = await this.langagesService.update(
      req.user.user_id,
      updateLangageDto,
    );
    return dataUpdated;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Request() req) {
    const save = await this.langagesService.findOnefilter(req.user.user_id);

    await Langage.remove(save);
    return save;
  }
}
