import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Res,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const verifMail = await User.findOneBy({ mail: createUserDto.mail });
    const verifPseudo = await User.findOneBy({ pseudo: createUserDto.pseudo });

    if (verifMail || verifPseudo) {
      res.status(401).json({
        status: '401',
        message: 'This client is existing,mail or pseudo are existing !!',
      });
      return;
    }
    const data = await this.usersService.register(createUserDto);
    if (!createUserDto) {
      throw new BadRequestException('informations manquantes');
    } else {
      return data;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const findId = this.usersService.findOne(+id);
    const verifId = (await User.findOneBy({ id: id })).id;
    if (verifId === null) {
      throw new NotFoundException("l'ID ne correspond à aucun utilisateur");
    }
    return findId;
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = await this.usersService.findOne(+id);
    if (!data) {
      throw new NotFoundException("l'ID' ne correspond à aucun utilisateur");
    }
    return await this.usersService.update(+id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    const data = await this.usersService.findOne(+id);
    if (!data) {
      throw new NotFoundException("l'ID' ne correspond à aucun utilisateur");
    }
    return this.usersService.remove(+id);
  }
}
