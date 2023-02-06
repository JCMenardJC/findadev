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
  create(@Body() createLangageDto: CreateLangageDto, @Req() req) {
    return this.langagesService.create(
      createLangageDto /* , req.user.user_id */,
    );
  }

  @Get()
  findAll() {
    return this.langagesService.findAll();
  }

  @Get('/byUser')
  findOne(@Param('id') id: string, @Req() req) {
    return this.langagesService.findOne(+id);
  }

  @Patch('/update')
  update(
    @Param('id') id: string,
    @Body() updateLangageDto: UpdateLangageDto,
    @Req() req,
  ) {
    return this.langagesService.update(+id, updateLangageDto);
  }

  @Delete('/delete')
  remove(@Param('id') id: string, @Req() req) {
    return this.langagesService.remove(+id);
  }
}
