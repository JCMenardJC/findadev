import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProfilDto } from './profil-dto';
import { ProfilService } from './profil.service';

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
