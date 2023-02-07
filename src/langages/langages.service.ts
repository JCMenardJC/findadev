import { Injectable } from '@nestjs/common';
import { CreateLangageDto } from './dto/create-langage.dto';
import { UpdateLangageDto } from './dto/update-langage.dto';
import { Langage } from './entities/langage.entity';

@Injectable()
export class LangagesService {
  async create(
    createLangageDto: CreateLangageDto,
    user_id: number,
  ): Promise<Langage | undefined> {
    const newLangage = new Langage();

    newLangage.user = user_id;
    let i = 1;
    while (createLangageDto[`langage_${i}`]) {
      newLangage[`langage_${i}`] = createLangageDto[`langage_${i}`];
      i++;
    }
    await Langage.save(newLangage);
    const newData = await this.findOnefilter(user_id);

    if (newData) {
      return newData;
    }
    return undefined;
  }

  async findAll(): Promise<Langage[] | undefined> {
    const data = await Langage.find({
      select: {
        user: false,
      },
    });
    if (data[0]) {
      return data;
    }
    return undefined;
  }

  async findOnefilter(user: number): Promise<any | undefined> {
    const dataUser = await Langage.findOneBy({ user });

    //fromEntries pour transformer le tableau obtenu par entries de l'objet cible que j'ai filtré pour obtenir seulement la donnée voulue
    const test = Object.fromEntries(
      Object.entries(dataUser).filter((data) => data[1]),
    );
    console.log(test);

    if (dataUser) {
      return test;
    }
    return undefined;
  }

  async update(user: number, updateLangageDto: UpdateLangageDto) {
    const data = await this.findOnefilter(user);

    await Langage.update(data.id, updateLangageDto);

    const dataUpdated = await this.findOnefilter(user);

    if (dataUpdated) {
      return dataUpdated;
    }
    return undefined;
  }

  async remove(user: number): Promise<Langage | undefined> {
    const save = await this.findOnefilter(user);
    await Langage.delete({ user });
    const verif = await this.findOnefilter(user);
    if (verif) {
      return undefined;
    }
    return save;
  }
}
