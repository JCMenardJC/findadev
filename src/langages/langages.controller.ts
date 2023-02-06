import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { LangagesService } from './langages.service';
import { CreateLangageDto } from './dto/create-langage.dto';
import { UpdateLangageDto } from './dto/update-langage.dto';

@Controller('langages')
export class LangagesController {
  constructor(private readonly langagesService: LangagesService) {}

  @Post()
  async create(@Body() createLangageDto: CreateLangageDto, @Req() req) {
    const data = await this.langagesService.create(
      createLangageDto /* , req.user.user_id */,
    );
    return data;
  }

  @Get()
  async findAll() {
    return await this.langagesService.findAll();
  }

  @Get('/byUser')
  async findOne(@Param('id') id: string, @Req() req) {
    return await this.langagesService.findOne(+id);
  }

  @Patch('/update')
  async update(
    @Param('id') id: string,
    @Body() updateLangageDto: UpdateLangageDto,
    @Req() req,
  ) {
    return await this.langagesService.update(+id, updateLangageDto);
  }

  @Delete('/delete')
  async remove(@Param('id') id: string, @Req() req) {
    return await this.langagesService.remove(+id);
  }
}
