import { Controller, Get, Req } from '@nestjs/common';
import { ProfilDto } from './profil-dto';
import { ProfilService } from './profil.service';

@Controller('profil')
export class ProfilController {
  constructor(private readonly profilService: ProfilService) {}

  @Get()
  getProfilbyId(@Req() req): Promise<ProfilDto | undefined> {
    const dataProfil = this.profilService.getProfil(req.user.user_id);
    return undefined;
  }
}
