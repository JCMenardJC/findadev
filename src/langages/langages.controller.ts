import {
        Controller,
        Get,
        Post,
        Body,
        Patch,
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
        constructor(private readonly langagesService: LangagesService) { }

        @UseGuards(JwtAuthGuard)
        @Post()
        async create(
                @Body() createLangageDto: CreateLangageDto,
                @Request() req
        ) {
                const dataCheck = await Langage.findOneBy({
                        user: req.user.user_id,
                });
                if (dataCheck) {
                        return {
                                status: EStatus.FAIL,
                                message: 'Vous avez déjà déclaré vos langages connus !!',
                        };
                }
                const data = await this.langagesService.create(
                        createLangageDto,
                        req.user.user_id
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
        @Get('byUser')
        async findOne(@Request() req) {
                const dataCheck = await Langage.findOneBy(req.user.user_id);

                if (!dataCheck) {
                        return {
                                status: EStatus.FAIL,
                                message:
                                        EMessageStatus.Unknown +
                                        ` Vous n'avez pas de langage connu !!`,
                        };
                }
                const data = await this.langagesService.findOnefilter(
                        req.user.user_id
                );
                if (data) {
                        return {
                                status: EStatus.OK,
                                message: EMessageStatus.dataOK,
                                data: data,
                        };
                }
                return {
                        status: EStatus.FAIL,
                        message: EMessageStatus.dataKO,
                        data: data,
                };
        }

        @UseGuards(JwtAuthGuard)
        @Patch()
        async update(
                @Body() updateLangageDto: UpdateLangageDto,
                @Request() req
        ) {
                /* const origincheck = Object.keys(Langage).map((data) => data);
    const inputCheck = Object.keys(updateLangageDto).map((data) =>
      origincheck.includes(data) ? data : false,
    );

    if (inputCheck.includes(false)) {
      return 'vérifiez votre saisie !!';
    } */

                const dataCheck = await Langage.findOneBy(req.user.user_id);

                if (!dataCheck) {
                        return {
                                status: EStatus.FAIL,
                                message:
                                        EMessageStatus.Unknown +
                                        ` Vous n'avez pas de langage connu !!`,
                        };
                }
                const dataUpdated = await this.langagesService.update(
                        req.user.user_id,
                        updateLangageDto
                );
                return {
                        status: EStatus.OK,
                        message: EMessageStatus.updateOK,
                        dataUpdated: dataUpdated,
                };
        }

        @UseGuards(JwtAuthGuard)
        @Delete()
        async remove(@Request() req) {
                const dataCheck = await Langage.findOneBy(req.user.user_id);

                if (!dataCheck) {
                        return {
                                status: EStatus.FAIL,
                                message:
                                        EMessageStatus.Unknown +
                                        ` Vous n'avez pas de langage connu !!`,
                        };
                }
                const save = await this.langagesService.findOnefilter(
                        req.user.user_id
                );

                await Langage.remove(save);
                return {
                        status: EStatus.OK,
                        message: EMessageStatus.DeletedOK,
                        save: save,
                };
        }
}
