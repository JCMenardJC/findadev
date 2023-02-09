import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { CreateCompetenceDto } from "./dto/create-competence.dto";
import { UpdateCompetenceDto } from "./dto/update-competence.dto";
import { Competence } from "./entities/competence.entity";

@Injectable()
export class CompetencesService {
  create(createCompetenceDto: CreateCompetenceDto, user: User) {
    const newCompetence = new Competence();
    newCompetence.user = user;
    newCompetence.competence1 = createCompetenceDto.competence1;
    newCompetence.competence2 = createCompetenceDto.competence2;
    newCompetence.competence3 = createCompetenceDto.competence3;
    newCompetence.competence4 = createCompetenceDto.competence4;
    newCompetence.competence5 = createCompetenceDto.competence5;
    newCompetence.competence5 = createCompetenceDto.competence5;
    newCompetence.competence6 = createCompetenceDto.competence6;
    newCompetence.save();
    return newCompetence;
  }

  async findAll() {
    const allCompetences = await Competence.find();
    return allCompetences;
  }

  async findByCompetence(competence: string) {
    const findCompetence = await Competence.findBy({
      competence1: competence,
      competence2: competence,
      competence3: competence,
      competence4: competence,
      competence5: competence,
      competence6: competence,
    });
    if (!findCompetence) {
      return "La compétence recherchée n existe pas";
    } else {
      return findCompetence;
    }
  }

  async findOneById(id: number) {
    const findCompetence = await Competence.findOne({
      where: {
        user: {
          id: id,
        },
      },
    });
    return findCompetence;
  }

  async update(id: number, updateCompetenceDto: UpdateCompetenceDto) {
    const competenceChanged = await Competence.findBy({ id });
    if (
      updateCompetenceDto.competence1 == competenceChanged[0].competence1 ||
      updateCompetenceDto.competence2 == competenceChanged[0].competence2 ||
      updateCompetenceDto.competence3 == competenceChanged[0].competence3 ||
      updateCompetenceDto.competence4 == competenceChanged[0].competence4 ||
      updateCompetenceDto.competence5 == competenceChanged[0].competence5 ||
      updateCompetenceDto.competence6 == competenceChanged[0].competence6
    ) {
      return `pas de compétences rentrées`;
    } else {
      //await Competence.update(id, updateCompetenceDto);
      if (competenceChanged) {
        return competenceChanged;
      } else {
        return undefined;
      }
    }
  }

  async remove(id: number) {
    const idCompetence = await Competence.findOneBy({ id: id });
    if (!idCompetence) {
      return "La compétence recherchée n existe pas";
    }
    await Competence.remove(idCompetence);
    return idCompetence;
  }
}
