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
    NotFoundException,
    Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { EStatus } from 'src/constants/enum';
import { request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        if (!createUserDto) {
            return {
                status: EStatus.ERROR,
                message: 'Des données sont manquantes pour s enregistrer',
            };
        }
        const verifUser = await this.usersService.findOneMail(
            createUserDto.mail,
        );
        const verifUsername = await this.usersService.findOneUsername(
            createUserDto.username,
        );
        if (verifUser || verifUsername) {
            return {
                status: EStatus.ERROR,
                message:
                    'Le mail ou le username saisie existent déjà ,veuillez vous connectez, ou bien corriger vos données saisies ',
            };
        }
        const userCreated = await this.usersService.register(createUserDto);
        return {
            status: EStatus.OK,
            message: `Vous étes maintenant enregistrez`,
            data: userCreated,
        };
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        const userAllFind = await this.usersService.findAll();
        return {
            status: EStatus.OK,
            message: `Voici tous les utilisateurs enregistrés`,
            data: userAllFind,
        };
    }
    @UseGuards(JwtAuthGuard)
    @Get('/ByUser')
    async findOne(@Request() req) {
        const findId = await this.usersService.findOne(req.user.user_id);
        return {
            status: EStatus.OK,
            message: `Les données de l'identifiant`,
            data: findId,
        };
    }
    @UseGuards(JwtAuthGuard)
    @Patch()
    async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        const data = await this.usersService.findOne(req.user.user_id);
        if (!data) {
            throw new NotFoundException(
                "l'ID recherché ne correspond à aucun utilisateur",
            );
        }
        const userUpdated = await this.usersService.update(
            req.user.user_id,
            updateUserDto,
        );
        return {
            status: EStatus.OK,
            message: 'Les données ont été mise à jour',
            data: userUpdated,
        };
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: string) {
        const data = await this.usersService.findOne(+id);
        const verifPropID = (await User.findOneBy({ id: +id })).id;
        if (!data) {
            throw new NotFoundException(
                "l'ID de suppression recherché  ne correspond à aucun utilisateur",
            );
        }
        console.log(verifPropID !== data.id);

        if (verifPropID !== data.id) {
            return {
                status: EStatus.OK,
                message: `Des données de l'identifiant ${id} ne vous appartiennent pas `,
            };
        }
        const userRemoved = await this.usersService.remove(+id);
        return {
            status: EStatus.OK,
            message: `Des données de l'identifiant ${id} ont été supprimées`,
            data: userRemoved,
        };
    }
}
