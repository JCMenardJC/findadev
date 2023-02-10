import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { EMessageStatus, EStatus } from "src/constants/enum";
import { UsersService } from "src/users/users.service";
import { CompetencesService } from "./competences.service";
import { CreateCompetenceDto } from "./dto/create-competence.dto";
import { UpdateCompetenceDto } from "./dto/update-competence.dto";
import { Competence } from "./entities/competence.entity";

@ApiBearerAuth()
@ApiTags("competences")
@Controller("competences")
export class CompetencesController {
  constructor(
    private readonly competencesService: CompetencesService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createCompetenceDto: CreateCompetenceDto,
    @Request() req,
    @Res() res: Response
  ) {
    const verifUser = await this.competencesService.findOneById(
      req.user.user_id
    );
    const user = await this.usersService.findOne(req.user.user_id);

    if (verifUser) {
      res.status(401).json({
        status: "401",
        message: "This user has already post his competences !!",
      });
    } else {
      await this.competencesService.create(createCompetenceDto, user);
      res.status(201).json({
        status: "201",
        message: "Success",
        data: createCompetenceDto,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.competencesService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOneById(@Param("id") id: number) {
    return this.competencesService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Body() updateCompetenceDto: UpdateCompetenceDto,
    @Request() req
  ) {
    const dataCheck = await Competence.findOneBy({
      user: { id: req.user.user_id },
    });

    if (!dataCheck) {
      return {
        status: EStatus.FAIL,
        message:
          EMessageStatus.Unknown + `Vous n'avez aucune compétence connues !!`,
      };
    }
    const dataUpdate = await this.competencesService.update(
      req.user.user_id,
      updateCompetenceDto
    );
    return {
      status: EStatus.OK,
      message: EMessageStatus.updateOK,
      dataUpdated: dataUpdate,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.competencesService.remove(+id);
  }
}
