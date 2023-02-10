import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProfilDto } from './profil-dto';
import { ProfilService } from './profil.service';


@ApiTags('Profils')
@Controller('profil')
export class ProfilController {
    constructor(private readonly profilService: ProfilService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProfilbyId(@Request() req): Promise<ProfilDto | undefined> {
        const dataProfil = await this.profilService.getProfil(req.user.user_id);
        return dataProfil;
    }
}
