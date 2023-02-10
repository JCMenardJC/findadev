import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Delete,
    UseGuards,
    NotFoundException,
    Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EStatus } from 'src/constants/enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
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
    @ApiBearerAuth()
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/comptePerso')
    async findOne(@Request() req) {
        const findId = await this.usersService.findOne(req.user.user_id);
        console.log(findId);

        return {
            status: EStatus.OK,
            message: `Les données de l'identifiant`,
            data: findId,
        };
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch()
    async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        const data = await this.usersService.findOne(req.user.user_id);
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete()
    async remove(@Request() req) {
        const data = await this.usersService.findOne(req.user.user_id);
        if (!data) {
            throw new NotFoundException('Votre compte a déjà était supprimé');
        }
        const userRemoved = await this.usersService.remove(req.user.user_id);
        return {
            status: EStatus.OK,
            message: `Des données de l'identifiant ${data.id} ont été supprimées`,
            data: userRemoved,
        };
    }
}
