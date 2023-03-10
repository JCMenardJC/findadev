import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { CreateCompetenceDto } from "./dto/create-competence.dto";
import { UpdateCompetenceDto } from "./dto/update-competence.dto";
import { Competence } from "./entities/competence.entity";

/**
 * Class permettant la gestion des requêtes SQL pour les "compétences"
 * * **.create()** :ajoute de nouvelles "compétences" à la BDD
 * * **.findAll()** : recupère toutes les "compétences" dans la BDD
 * * **.findByCompetence()** : recupère une "compétence" par son intitulé
 * * **.findOneById()**:recupère une "compétence" par son ID
 * * **.update()** : modifie les donnees d'une ou des "compétences" d' un user avec son ID
 * * **.remove()** : supprime lesdonnees des "compétences" d'un user
 */

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

  async update(user: number, updateCompetenceDto: UpdateCompetenceDto) {
    const data = await Competence.findOneBy({ user: { id: user } });

    await Competence.update(data.id, updateCompetenceDto);

    const dataUpdated = await Competence.findOneBy({ user: { id: user } });

    if (dataUpdated) {
      return dataUpdated;
    }
    return undefined;
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
