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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { EStatus } from 'src/constants/enum';

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
        if (verifUser) {
            return {
                status: EStatus.ERROR,
                message:
                    'Le mail ou le pseudo saisie existent déjà ,veuillez vous connectez, ou bien corriger vos données saisies ',
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
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const findId = this.usersService.findOne(+id);
        const verifId = (await User.findOneBy({ id: id })).id;
        if (verifId === null) {
            throw new NotFoundException(
                "l'ID recherché ne correspond à aucun utilisateur",
            );
        }
        return {
            status: EStatus.OK,
            message: `Des données de l'identifiant ${id} ont été supprimées`,
            data: findId,
        };
    }
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const data = await this.usersService.findOne(+id);
        if (!data) {
            throw new NotFoundException(
                "l'ID recherché ne correspond à aucun utilisateur",
            );
        }
        const userUpdated = await this.usersService.update(+id, updateUserDto);
        return {
            status: EStatus.OK,
            message: 'Des données ont été mise à jour',
            data: userUpdated,
        };
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: string) {
        const data = await this.usersService.findOne(+id);
        if (!data) {
            throw new NotFoundException(
                "l'ID de suppression recherché  ne correspond à aucun utilisateur",
            );
        }
        const userRemoved = await this.usersService.remove(+id);
        return {
            status: EStatus.OK,
            message: `Des données de l'identifiant ${id} ont été supprimées`,
            data: userRemoved,
        };
    }
}
